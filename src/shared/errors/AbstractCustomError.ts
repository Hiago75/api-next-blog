export abstract class CustomError extends Error {
  protected _statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
