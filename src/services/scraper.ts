import { logger } from "@configs/logger";
import axios from "axios";
import * as cheerio from "cheerio";
import { v4 as uuidv4 } from "uuid";
import { saveFileToObjectStorage } from "@services/object-storage";
const Logger = logger("@services/scraper");

export async function crawl() {}

export async function scrape(url: string) {
  try {
    Logger("scrape").info(`Scraping URL: ${url}`);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const { hostname } = new URL(url);

    const fileId = uuidv4();
    // fs.writeFileSync(
    //   `scrapes/${fileId}.json`,
    //   JSON.stringify(response.data, null, 2)
    // );

    const fileMetaData = {
      url,
      fileId,
      hostname,
    };

    await saveFileToObjectStorage({ data: response.data, name: fileId });
    Logger("scrape").info("file saved successfully.");
    return fileMetaData;
  } catch (error) {
    throw Error(error);
  }
}
