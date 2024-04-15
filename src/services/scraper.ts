import { logger } from "@configs/logger";
import axios from "axios";
import * as cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { saveFileToObjectStorage } from "@services/object-storage";
import { ApiError } from "@utils/apiError";
import httpStatus from "http-status";
import { findPageByURL, savePageMetaDataToDB } from "./page";

const Logger = logger("@services/scraper");

export async function scrape(url: string) {
  try {
    Logger("scrape").info(`Scraping URL: ${url}`);

    const hasURLAlreadyBeenScraped = await findPageByURL({
      url,
      isScraped: true,
    });
    Logger("scrape").info("%o", hasURLAlreadyBeenScraped);
    if (hasURLAlreadyBeenScraped)
      throw new ApiError(
        httpStatus.CONFLICT,
        `URL: ${url} has already been scraped.`
      );

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const { hostname } = new URL(url);

    const fileId = uuidv4();

    const fileMetaData = {
      url,
      fileId,
      hostname,
    };

    // Save to S3
    await saveFileToObjectStorage({ data: response.data, name: fileId });
    // Save metadata to DB
    const page = await savePageMetaDataToDB({
      ...fileMetaData,
      isScraped: true,
    });

    Logger("scrape").info("file saved successfully.");

    return page;
  } catch (error) {
    throw Error(error);
  }
}
