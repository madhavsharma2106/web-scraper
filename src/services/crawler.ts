import { ILink } from "@types";
import { logger } from "@configs/logger";
import { getFileFromObjectStore } from "@services/object-storage";
import * as cheerio from "cheerio";
import { getURLsFromPage } from "./utils/crawler";

const Logger = logger("@services/crawler");

export async function crawl(link: ILink) {
  Logger("crawl").info(`Crawling URL: ${link.url}`);
  try {
    // Get data from S3 Bucket
    const object = await getFileFromObjectStore(link.fileId);
    const objectContent = object.Body?.toString("utf-8");
    const $ = cheerio.load(objectContent as string);

    // Scraping links
    const links = getURLsFromPage($, link.url);
    return links;
  } catch (error) {
    throw Error(error);
  }
}
