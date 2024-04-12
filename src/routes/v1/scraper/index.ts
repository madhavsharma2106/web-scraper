import { Router } from "express";
import { scrapeData } from "@controllers/scraper";

export const scraperRouter = Router();

scraperRouter.route("/").post(scrapeData);
