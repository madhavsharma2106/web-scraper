import { Router } from "express";
import {
  scrapeData,
  scrapeAllPagesInSite,
  scrapeUnscraped,
} from "@controllers/scraper";

export const scraperRouter = Router();

scraperRouter.route("/").post(scrapeData);
scraperRouter.route("/all").post(scrapeAllPagesInSite);
scraperRouter.route("/unscraped").post(scrapeUnscraped);
