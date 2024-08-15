export class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}
