import { CustomError } from './';

export class Forbidden extends CustomError {
  protected _statusCode = 403;
}
