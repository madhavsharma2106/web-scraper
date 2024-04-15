import { logger } from "@configs/logger";
import { crawl } from "@services/crawler";
import { findUnscrapedPage } from "@services/page";
import { scrape } from "@services/scraper";
import { catchAsync } from "@utils/catchAsync";
import { successResponse } from "@utils/successResponse";
import { Request, Response } from "express";

const Logger = logger("@controller/scraper");

export const scrapeData = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.query;
  const pageMetaData = await scrape(url as string);
  const urlsInPage = await crawl(pageMetaData);
  res.send(successResponse({ pageMetaData, urlsInPage }));
});

const _scrapeAllPagesInSite = async (url: string) => {
  try {
    const pageMetaData = await scrape(url as string);
    const urlsInPage = await crawl(pageMetaData);
    Logger("_scrapeAllPagesInSite").info({ pageMetaData, urlsInPage });
    const unscrapedPage = await findUnscrapedPage();
    if (unscrapedPage) {
      Logger("_scrapeAllPagesInSite").info(unscrapedPage);
      await _scrapeAllPagesInSite(unscrapedPage.url);
    }
  } catch (error) {
    Logger("_scrapeAllPagesInSite").error("%o", error);
  }
};

export const scrapeAllPagesInSite = catchAsync(
  async (req: Request, res: Response) => {
    const { url } = req.query;
    res.send(successResponse("ok"));
    _scrapeAllPagesInSite(url as string);
  }
);

const scrapeUnscrapedPages = async (url: string) => {
  try {
    const page = await scrape(url as string);
    await crawl(page);
    const unscrapedPage = await findUnscrapedPage();
    if (unscrapedPage) {
      Logger("scrapeUnscrapedPages").info(unscrapedPage);
      await scrapeUnscrapedPages(unscrapedPage.url);
    }
  } catch (error) {
    Logger("scrapeUnscrapedPages").error("%o", error);
  }
};

export const scrapeUnscraped = catchAsync(
  async (req: Request, res: Response) => {
    const unscrapedPage = await findUnscrapedPage();
    unscrapedPage && scrapeUnscrapedPages(unscrapedPage.url);
    res.send(successResponse("ok"));
  }
);
