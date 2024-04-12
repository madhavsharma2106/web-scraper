import { crawl } from "./crawler";

export interface ISite {
  domain: string;
  url: string;
}

const netflix: ISite = {
  url: "https://netflixtechblog.com/introducing-safetest-a-novel-approach-to-front-end-testing-37f9f88c152d",
  domain: "netflix-engineering",
};

const discord: ISite = {
  url: "https://discord.com/blog/how-it-all-goes-live-an-overview-of-discords-streaming-technology",
  domain: "discord-engineering",
};
const fb_homepage: ISite = {
  url: "https://engineering.fb.com",
  domain: "fb-engineering",
};

// scrapeBlog(discord);
crawl(fb_homepage);

/**
 * 1. Go to a root page
 * 2. Scrape the page.
 * 3. Find all the the links in the page. (Crawling)
 *    a. Sanitize the links to make sure only ones with the same hostname are present
 *    b. Store all the sanitized links in the database.
 * 4. Go to the URL stored in the DB
 *
 */
