import { logger } from "@configs/logger";
import { Scrape } from "@models/scrape";
import axios from "axios";
import * as cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { saveFileToObjectStorage } from "@services/object-storage";
import { IScrape } from "@types";
const Logger = logger("@services/scraper");

export async function crawl() {}

export async function scrape(url: string) {
  try {
    Logger("scrape").info(`Scraping URL: ${url}`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const { hostname } = new URL(url);

    const fileId = uuidv4();

    const fileMetaData = {
      url,
      fileId,
      hostname,
    };

    await saveFileToObjectStorage({ data: response.data, name: fileId });
    await saveScrapeMetaDataToDB({ ...fileMetaData, isCrawled: false });
    await Logger("scrape").info("file saved successfully.");
    return fileMetaData;
  } catch (error) {
    throw Error(error);
  }
}

export const saveScrapeMetaDataToDB = async (scrape: IScrape) => {
  return await Scrape.create(scrape);
};
