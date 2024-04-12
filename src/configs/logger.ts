import { config } from "@configs/env";
import winston from "winston";
import { ENVIRONMENT } from "@types";
require("winston-syslog");

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const transports = [];

// @ts-ignoreno
transports.push(new winston.transports.Console({}));

const _logger = winston.createLogger({
  level: config.env === ENVIRONMENT.DEVELOPMENT ? "debug" : "info",
  defaultMeta: { service: config.appName },
  format: winston.format.combine(
    enumerateErrorFormat(),
    config.env === ENVIRONMENT.DEVELOPMENT
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.ms(),
    winston.format.printf(
      ({ level, message, timestamp, moduleName, functionName, service }) => {
        return `${timestamp} ${service}:${config.env}  ${level}: [${moduleName}][${functionName}] ${message}`;
      }
    )
  ),
  transports,
});

export const logger = function (moduleName) {
  return (functionName) => _logger.child({ moduleName, functionName });
};
