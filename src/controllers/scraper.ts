import { crawl } from "@services/crawler";
import { scrape } from "@services/scraper";
import { catchAsync } from "@utils/catchAsync";
import { Request, Response } from "express";

export const scrapeData = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.query;
  const scrapeMetaData = await scrape(url as string);
  const crawledData = await crawl(scrapeMetaData);
  res.send({ scrapeMetaData, crawledData });
});
