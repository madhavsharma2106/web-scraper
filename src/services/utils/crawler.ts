export const getURLsFromPage = ($: cheerio.Root, currentUrl: string) => {
  const urls: string[] = [];
  $("a").each((index, element) => {
    let href = $(element).attr("href");
    if (href) {
      urls.push(href);
    }
  });

  const sanitizedUrls = sanitizeUrls(urls, currentUrl);
  return sanitizedUrls;
};

export const sanitizeUrls = (urls: string[], currentUrl: string) => {
  const sanitizedUrls: string[] = [];

  for (let url of urls) {
    // Remove Query Params
    let cleanUrl = removeQueryParams(url);

    // Remove trailing slashes
    cleanUrl = removeTrailingSlash(cleanUrl);

    // Check the url is pointing to the current page
    if (cleanUrl.includes(currentUrl) && cleanUrl !== currentUrl)
      sanitizedUrls.push(cleanUrl);
  }

  // Deduplicate
  const deduplicatedUrls = [...new Set(sanitizedUrls)];

  return deduplicatedUrls;
};

export const removeTrailingSlash = (str: string) => {
  if (str.endsWith("/")) return str.slice(0, -1);
  return str;
};

export const removeQueryParams = (url: string) => {
  const indexOfQPstarting = url.indexOf("?");
  if (indexOfQPstarting === -1) return url;
  return url.substring(0, indexOfQPstarting);
};
