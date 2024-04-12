import { Router } from "express";
import { scraperRouter } from "./scraper/index";

export const v1Router = Router();

v1Router.use("/scrape", scraperRouter);
