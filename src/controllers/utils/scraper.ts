import { logger } from "@configs/logger";
import { crawl } from "@services/crawler";
import { findUnscrapedPage } from "@services/page";
import { scrape } from "@services/scraper";

const Logger = logger("@controller/utils/scraper");

export const scrapeAllUnscrapedPages = async (url: string) => {
  try {
    const page = await scrape(url as string);
    await crawl(page);
    const unscrapedPage = await findUnscrapedPage();
    if (unscrapedPage) {
      Logger("scrapeAllUnscrapedPages").info(unscrapedPage);
      await scrapeAllUnscrapedPages(unscrapedPage.url);
    }
  } catch (error) {
    Logger("scrapeAllUnscrapedPages").error("%o", error);
  }
};

export const scrapeAllPagesInSite = async (url: string) => {
  try {
    const pageMetaData = await scrape(url as string);
    const urlsInPage = await crawl(pageMetaData);
    Logger("scrapeAllPagesInSite").info({ pageMetaData, urlsInPage });
    const unscrapedPage = await findUnscrapedPage();
    if (unscrapedPage) {
      Logger("scrapeAllPagesInSite").info(unscrapedPage);
      await scrapeAllPagesInSite(unscrapedPage.url);
    }
  } catch (error) {
    Logger("scrapeAllPagesInSite").error("%o", error);
  }
};
