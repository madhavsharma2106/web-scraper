import { catchAsync } from "@utils/catchAsync";
import { Request, Response } from "express";

export const scrapeData = catchAsync((req: Request, res: Response) => {
  const { url } = req.query;
  res.send(url);
});
