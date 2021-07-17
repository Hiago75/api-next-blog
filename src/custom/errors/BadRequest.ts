import { CustomError } from './';

export class BadRequest extends CustomError {
  protected _statusCode = 400;
}
