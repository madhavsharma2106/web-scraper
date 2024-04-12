import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import { ISite } from "./oldindex";

export async function crawl({ url, domain }: ISite): Promise<void> {
  try {
    const { hostname } = new URL(url);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scrapedData = {
      links: [],
    };

    // Scraping lnks
    $("a").each((index, element) => {
      const href = $(element).attr("href");
      scrapedData.links.push(href);
    });

    // Write scraped data to a JSON file
    fs.writeFileSync(`${domain}.json`, JSON.stringify(scrapedData, null, 2));

    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
