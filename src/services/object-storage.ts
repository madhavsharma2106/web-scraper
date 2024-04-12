import { logger } from "@configs/logger";
import { s3 } from "@configs/s3";
import { SCRAPES_BUCKET } from "@constants/storage";
import AWS from "aws-sdk";
const Logger = logger("@services/object-storage");

interface ISaveFileToObjectStorage {
  data: string;
  name: string;
}

export const saveFileToObjectStorage = async (
  file: ISaveFileToObjectStorage
) => {
  try {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: SCRAPES_BUCKET,
      Key: file.name,
      Body: file.data,
      ContentType: "html",
    };

    const result = await s3.putObject(params).promise();
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
