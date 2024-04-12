import { logger } from "@configs/logger";
import { ApiError } from "@utils/apiError";
const Logger = logger("error.middleware");
import httpStatus from "http-status";
import { config } from "@configs/env";
import { ENVIRONMENT } from "@types";

export const errorConverter = (err, req, res, next) => {
  let error = err;
  Logger("errorConverter").error(JSON.stringify(err));

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// TODO: We send status as statusCode in the response.
// this causes confusion

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === "production" && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    success: false,
    message,
    ...(config.env === ENVIRONMENT.DEVELOPMENT && { stack: err.stack }),
  };
  Logger("errorHandler").error(JSON.stringify({ ...err, stack: err.stack }));

  res.status(statusCode).send(response);
};
