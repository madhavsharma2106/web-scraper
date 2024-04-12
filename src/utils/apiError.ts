import httpStatus from "http-status";

export class ApiError extends Error {
  isOperational: boolean;
  statusCode: number;

  constructor(
    statusCode: number,
    message?: any,
    isOperational = true,
    stack = ""
  ) {
    if (!message) {
      message = httpStatus[`${httpStatus[statusCode]}_MESSAGE`];
    }

    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
