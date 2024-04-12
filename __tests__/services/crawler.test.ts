import {
  removeQueryParams,
  removeTrailingSlash,
  sanitizeLinks,
} from "@services/utils/crawler";
import { SANITISED_LINKS, UNSANITISED_LINKS } from "../dummy_data/links";

describe("sanitizeLinks", () => {
  it("should remove currentUrl from links", () => {
    const currentUrl = "https://engineering.fb.com";
    const result = sanitizeLinks(UNSANITISED_LINKS, currentUrl);
    expect(result).toEqual(SANITISED_LINKS);
  });

  it("should deduplicate links", () => {
    const links = [
      "https://www.example.com/page1",
      "https://www.example.com/page1",
      "https://www.example.com/page2",
      "https://www.example.com/page3",
    ];
    const currentUrl = "https://www.example.com";

    const result = sanitizeLinks(links, currentUrl);

    expect(result).toEqual([
      "https://www.example.com/page1",
      "https://www.example.com/page2",
      "https://www.example.com/page3",
    ]);
  });

  it("should remove trailing /s", () => {
    const links = ["https://www.example.com/page1/"];
    const currentUrl = "https://www.example.com";

    const result = sanitizeLinks(links, currentUrl);

    expect(result).toEqual(["https://www.example.com/page1"]);
  });

  it("should remove links that are same after adding query params", () => {
    const links = ["https://www.example.com/page1/?test=test"];
    const currentUrl = "https://www.example.com";

    const result = sanitizeLinks(links, currentUrl);

    expect(result).toEqual(["https://www.example.com/page1"]);
  });
});

describe("removeTrailingSlash", () => {
  it("should remove trailing slash from a string with a trailing slash", () => {
    const stringWithSlash = "https://example.com/";
    const result = removeTrailingSlash(stringWithSlash);
    expect(result).toBe("https://example.com");
  });

  it("should return the same string if it does not end with a trailing slash", () => {
    const stringWithoutSlash = "https://example.com";
    const result = removeTrailingSlash(stringWithoutSlash);
    expect(result).toBe("https://example.com");
  });

  it("should handle empty string", () => {
    const emptyString = "";
    const result = removeTrailingSlash(emptyString);
    expect(result).toBe("");
  });

  it("should handle strings with multiple trailing slashes", () => {
    const stringWithMultipleSlashes = "https://example.com/path/";
    const result = removeTrailingSlash(stringWithMultipleSlashes);
    expect(result).toBe("https://example.com/path");
  });
});

describe("removeQueryParams function", () => {
  it("should remove query parameters from a URL with query parameters", () => {
    const url =
      "https://example.com/path/to/resource?param1=value1&param2=value2";
    const expectedResult = "https://example.com/path/to/resource";
    expect(removeQueryParams(url)).toBe(expectedResult);
  });

  it("should return the URL unchanged if it has no query parameters", () => {
    const url = "https://example.com/path/to/resource";
    expect(removeQueryParams(url)).toBe(url);
  });

  it("should not return the URL unchanged if it ends with a question mark", () => {
    const url = "https://example.com/path/to/resource?";
    expect(removeQueryParams(url)).toBe("https://example.com/path/to/resource");
  });

  it("should return an empty string if the input is an empty string", () => {
    const url = "";
    expect(removeQueryParams(url)).toBe("");
  });
});
