import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  appName: process.env.APP_NAME,
  mongoDatabaseURL: process.env.MONGODB_URL,
};
