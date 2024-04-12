import { scrape } from "@services/scraper";
import { catchAsync } from "@utils/catchAsync";
import { Request, Response } from "express";

export const scrapeData = catchAsync(async (req: Request, res: Response) => {
  const { url } = req.query;
  const metaData = await scrape(url as string);
  res.send(metaData);
});
