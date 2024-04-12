import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";

interface ScrapedData {
  titles: string[];
  paragraphs: string[];
}

interface IScrapeBlog {
  domain: string;
  url: string;
}

export async function scrapeBlog({ url, domain }: IScrapeBlog): Promise<void> {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const scrapedData: ScrapedData = {
      titles: [],
      paragraphs: [],
    };

    // Scraping titles
    $("h1").each((index, element) => {
      const title = $(element).text();
      scrapedData.titles.push(title);
    });

    // Scraping paragraphs
    $("p").each((index, element) => {
      const paragraph = $(element).text();
      scrapedData.paragraphs.push(paragraph);
    });

    // Write scraped data to a JSON file
    fs.writeFileSync(`${domain}.json`, JSON.stringify(scrapedData, null, 2));
    fs.writeFileSync(`${domain}.html`, response.data);

    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
