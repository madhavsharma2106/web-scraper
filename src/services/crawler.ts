import { IScrape } from "@types";
import { logger } from "@configs/logger";
import { getFileFromObjectStore } from "@services/object-storage";
import * as cheerio from "cheerio";
import { getLinksFromPage } from "./utils/crawler";

const Logger = logger("@services/crawler");

export async function crawl(scrape: IScrape) {
  Logger("crawl").info(`Crawling URL: ${scrape.url}`);
  try {
    const object = await getFileFromObjectStore(scrape.fileId);
    const objectContent = object.Body?.toString("utf-8");
    const $ = cheerio.load(objectContent as string);

    // Scraping links
    const links = getLinksFromPage($, scrape.url);
    return links;
  } catch (error) {
    throw Error(error);
  }
}
