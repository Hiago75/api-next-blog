import { NextFunction, Request, Response } from 'express';
import { ensureAuthenticated } from '../../../src/middlewares/ensureAuthenticated';
import { mockToken } from '../../utils';

describe('Ensure authentication middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  const sutFactory = () => {
    const sut = ensureAuthenticated(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

    return sut;
  };

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      json: jest.fn(),
    };
  });

  it('should not be able to pass without sending a authorization token', async () => {
    try {
      sutFactory();
    } catch (requestError) {
      expect(requestError.name).toBe('Error');
      expect(requestError.message).toBe('necessary_login_to_proceed');
    }
  });

  it('should not be able to pass with a token with an invalid formatation', async () => {
    mockRequest = {
      headers: {
        authorization: 'invalid Token',
      },
    };

    try {
      sutFactory();
    } catch (requestError) {
      expect(requestError.name).toBe('Error');
      expect(requestError.message).toBe('invalid_token_format');
    }
  });

  it('should not be able to pass with an invalid bearer token', async () => {
    mockRequest = {
      headers: {
        authorization: 'bearer Token',
      },
    };

    try {
      sutFactory();
    } catch (requestError) {
      expect(requestError.name).toBe('Error');
      expect(requestError.message).toBe('auth_token_invalid_error');
    }
  });

  it('should be able to pass', async () => {
    mockRequest = {
      headers: {
        authorization: 'bearer ' + mockToken,
      },
    };

    sutFactory();

    expect(nextFunction).toBeCalledTimes(1);
  });
});
