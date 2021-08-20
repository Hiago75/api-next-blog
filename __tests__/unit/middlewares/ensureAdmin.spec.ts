import { NextFunction, Request, Response } from 'express';
import { ensureAdmin } from '../../../src/middlewares/ensureAdmin';
import { authorFactory, testSetup } from '../../utils';

interface IEnsureAdminRequest {
  user_id: string;
}

describe('Ensure authentication middleware', () => {
  let mockRequest: Partial<Request> | IEnsureAdminRequest;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  const sutFactory = () => {
    const sut = ensureAdmin(mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

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

  testSetup();

  it('should not be able to proceed user id is missing', async () => {
    try {
      await sutFactory();
    } catch (requestError) {
      expect(requestError.message).toBe('necessary_login_to_proceed');
    }
  });

  it('should not be able to proceed if the sent user id is invalid', async () => {
    mockRequest = {
      user_id: 'invalid id',
    };

    try {
      await sutFactory();
    } catch (requestError) {
      expect(requestError.message).toBe('user_not_found_error');
    }
  });

  it('should not be able to proceed if the user is not admin', async () => {
    const { id } = await authorFactory('123456', false);

    mockRequest = {
      user_id: id,
    };

    try {
      await sutFactory();
    } catch (requestError) {
      expect(requestError.message).toBe('necessary_permissions_missing_error');
    }
  });

  it('should be able proceed if the user is admin', async () => {
    const { id } = await authorFactory('123456', true);

    mockRequest = {
      user_id: id,
    };

    await sutFactory();

    expect(nextFunction).toBeCalledTimes(1);
  });
});
