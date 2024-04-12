import { crawl } from "@services/crawler";
import { scrape } from "@services/scraper";
import { catchAsync } from "@utils/catchAsync";
import { successResponse } from "@utils/successResponse";
import { Request, Response } from "express";

export const scrapeData = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.query;
  const scrapeMetaData = await scrape(url as string);
  const crawledData = await crawl(scrapeMetaData);
  res.send(successResponse({ scrapeMetaData, crawledData }));
});
