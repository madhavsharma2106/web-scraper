import { logger } from "@configs/logger";
import { crawl } from "@services/crawler";
import { findUnscrapedPage } from "@services/page";
import { scrape } from "@services/scraper";
import { catchAsync } from "@utils/catchAsync";
import { successResponse } from "@utils/successResponse";
import { Request, Response } from "express";
import * as scraperUtils from "./utils/scraper";

const Logger = logger("@controller/scraper");

export const scrapeData = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.query;
  const pageMetaData = await scrape(url as string);
  const urlsInPage = await crawl(pageMetaData);
  res.send(successResponse({ pageMetaData, urlsInPage }));
});

export const scrapeAllPagesInSite = catchAsync(
  async (req: Request, res: Response) => {
    const { url } = req.query;
    res.send(successResponse("ok"));
    await scraperUtils.scrapeAllPagesInSite(url as string);
  }
);

export const scrapeAllUnscrapedPages = catchAsync(
  async (req: Request, res: Response) => {
    const unscrapedPage = await findUnscrapedPage();
    unscrapedPage &&
      (await scraperUtils.scrapeAllUnscrapedPages(unscrapedPage.url));
    res.send(successResponse("ok"));
  }
);
