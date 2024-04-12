export const getLinksFromPage = ($: cheerio.Root, currentUrl: string) => {
  const links: string[] = [];
  $("a").each((index, element) => {
    let href = $(element).attr("href");
    if (href) {
      links.push(href);
    }
  });

  const sanitizedLinks = sanitizeLinks(links, currentUrl);
  return sanitizedLinks;
};

export const sanitizeLinks = (links: string[], currentUrl: string) => {
  const sanitizedLinks: string[] = [];

  for (let link of links) {
    // Remove trailing slashes
    const cleanLink = removeTrailingSlash(link);
    // Check the link is pointing to the current hostname
    if (cleanLink.includes(currentUrl) && cleanLink !== currentUrl)
      sanitizedLinks.push(cleanLink);
  }

  // Deduplicate
  const deduplicatedLinks = [...new Set(sanitizedLinks)];

  return deduplicatedLinks;
};

export const removeTrailingSlash = (str: string) => {
  if (str.endsWith("/")) return str.slice(0, -1);
  return str;
};
