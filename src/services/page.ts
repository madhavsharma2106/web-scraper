import { Page } from "@models/page";
import { IPage } from "@types";
import { FilterQuery } from "mongoose";

export const savePageMetaDataToDB = async (scrape: IPage) => {
  return await Page.create(scrape);
};

export const findPageByURL = async (data: FilterQuery<IPage>) => {
  return await Page.findOne(data);
};

export const findUnscrapedPage = async (): Promise<IPage | null> => {
  return await Page.findOne({ isScraped: false });
};

export const storeMultiplePages = async (hostname: string, urls: string[]) => {
  const pageInserts = urls.map(async (url) => {
    const existingPage = await Page.findOne({ hostname, url });
    if (!existingPage) {
      return await Page.create({ hostname, url });
    }
  });
  return await Promise.all(pageInserts);
};
