import express from "express";
import cors from "cors";
import { rateLimiter } from "@middlewares/rateLimiter";
import helmet from "helmet";
import { config } from "@configs/env";
import { ENVIRONMENT } from "@types";
import morgan from "morgan";
import { v1Router } from "@routes/v1";

export const app = express();
import { logger } from "@configs/logger";
const Logger = logger("src/app.ts");
import httpStatus from "http-status";
import { ApiError } from "@utils/apiError";
import { errorConverter, errorHandler } from "@middlewares/error";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.options("*", cors());
if (config.env === ENVIRONMENT.PRODUCTION) app.use("/v1", rateLimiter);
if (config.env === ENVIRONMENT.DEVELOPMENT) {
  app.use(
    morgan("common", {
      stream: { write: (message) => Logger("morgan").info(message) },
    })
  );
}

app.use("/v1", v1Router);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);
