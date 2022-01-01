import { NextFunction, Request, Response } from 'express';
import { BadRequest, Forbidden, Unauthorized } from '../../../src/shared/errors';
import { errorHandler } from '../../../src/shared/infra/http/middlewares/errorHandler';
import translator from 'i18next';
import translatorBackend from 'i18next-fs-backend';
import translatorMiddleware from 'i18next-http-middleware';

describe('Ensure authentication middleware', () => {
  let error: Error;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  const nextFunction: NextFunction = jest.fn();

  // Configure the translator
  translator
    .use(translatorBackend)
    .use(translatorMiddleware.LanguageDetector)
    .init({
      fallbackLng: 'en',
      backend: {
        loadPath: './locales/{{lng}}/translation.json',
      },
    });

  const sutFactory = () => {
    const sut = errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction as NextFunction);

    return sut;
  };

  beforeEach(() => {
    mockRequest = {
      headers: {},
      t: jest.fn(),
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should not be able to pass if there is a BadRequest error', (done) => {
    error = new BadRequest('Bad request error');

    sutFactory();

    expect(error.message).toBe('Bad request error');
    expect(nextFunction).toBeCalledTimes(0);

    done();
  });

  it('should not be able to pass if there is an Unauthorized error', (done) => {
    error = new Unauthorized('Unauthorized error');

    sutFactory();

    expect(error.message).toBe('Unauthorized error');
    expect(nextFunction).toBeCalledTimes(0);

    done();
  });

  it('should not be able to pass if there is a Forbidden error', (done) => {
    error = new Forbidden('Forbidden error');

    sutFactory();

    expect(error.message).toBe('Forbidden error');
    expect(nextFunction).toBeCalledTimes(0);

    done();
  });

  it('should not be able to pass if the is an unexpected error', (done) => {
    error = new Error('Internal server error');

    sutFactory();

    expect(error.message).toBe('Internal server error');
    expect(nextFunction).toBeCalledTimes(0);

    done();
  });
});
