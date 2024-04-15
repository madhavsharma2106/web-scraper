import { IPage } from "@types";
import { logger } from "@configs/logger";
import { getFileFromObjectStore } from "@services/object-storage";
import * as cheerio from "cheerio";
import { getURLsFromPage } from "./utils/crawler";
import { storeMultiplePages } from "./page";

const Logger = logger("@services/crawler");

export async function crawl(page: IPage) {
  Logger("crawl").info(`Crawling URL: ${page.url}`);
  try {
    // Get data from S3 Bucket
    const object = await getFileFromObjectStore(page.fileId);
    const objectContent = object.Body?.toString("utf-8");
    const $ = cheerio.load(objectContent as string);

    // Scraping pages
    const urls = getURLsFromPage($, page.url);

    // Store Links
    if (urls.length > 0) await storeMultiplePages(page.hostname, urls);

    return urls;
  } catch (error) {
    throw Error(error);
  }
}
