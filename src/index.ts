import { config } from "@configs/env";
import nodeCleanup from "node-cleanup";
import * as db from "@configs/db";
import { app } from "./app";
import { logger } from "@configs/logger";

const Logger = logger("src/index");

app.listen(config.port, async () => {
  try {
    await db.connect();
    Logger("app.listen").info("Conencted to Db");
    Logger("app.listen").info(
      `Server running in ${config.env} enviroment on Port ${config.port}`
    );
  } catch (error) {
    Logger("app.listen").error("Unable to connect to the database:", error);
  }
});

const exitHandler = () => {
  Logger("exitHandler").info("called");
  process.exit(1);
};

const unexpectedErrorHandler = (error) => {
  Logger("unexpectedErrorHandler").error("%O", error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

nodeCleanup(async function (exitCode, signal) {
  Logger("nodeCleanup").info(
    "called with exitCode: " + exitCode + " and signal: " + signal
  );
  await db.disconnect();
  if (signal !== "uncaughtException" || signal !== "unhandledRejection") {
    exitHandler();
  }
});
