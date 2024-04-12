import { logger } from "@configs/logger";
import { Scrape } from "@models/scrape";
import axios from "axios";
import * as cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { saveFileToObjectStorage } from "@services/object-storage";
import { IScrape } from "@types";
import { FilterQuery } from "mongoose";
import { ApiError } from "@utils/apiError";
import httpStatus from "http-status";
const Logger = logger("@services/scraper");

export async function scrape(url: string) {
  try {
    Logger("scrape").info(`Scraping URL: ${url}`);

    const hasURLAlreadyBeenScraped = await findScrapeByURL({
      url,
      isScraped: true,
    });
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
    await saveScrapeMetaDataToDB({ ...fileMetaData, isScraped: true });

    Logger("scrape").info("file saved successfully.");

    return fileMetaData;
  } catch (error) {
    throw Error(error);
  }
}

export const saveScrapeMetaDataToDB = async (scrape: IScrape) => {
  return await Scrape.create(scrape);
};

export const findScrapeByURL = async (data: FilterQuery<IScrape>) => {
  return await Scrape.findOne(data);
};
