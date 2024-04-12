import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../../.env") });

export const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  appName: process.env.APP_NAME,
  mongoDatabaseURL: process.env.MONGODB_URL,
  s3: {
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
};
