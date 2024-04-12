import S3 from "aws-sdk/clients/s3";
import { config } from "@configs/env";

// Create an S3 client for IDrive e2
export const s3 = new S3({
  endpoint: config.s3.endpoint, //your storage-endpoint
  accessKeyId: config.s3.accessKeyId, //your access-key
  secretAccessKey: config.s3.secretAccessKey, //your secret-key
});
