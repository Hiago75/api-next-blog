import { CustomError } from '.';

export class Unauthorized extends CustomError {
  protected _statusCode = 401;
}
