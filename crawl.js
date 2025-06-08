const { JSDOM } = require("jsdom");

async function crawlWebsite(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`Crawling: ${currentURL}`);

  try {
    const response = await fetch(currentURL);

    if (response.status > 399) {
      console.log(
        `Error: HTTP ${response.status} on page ${currentURL}`
      );
      return pages;
    }

    const contentType = response.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Skipping non-HTML content: ${contentType} on page ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await response.text();
    const discoveredURLs = extractURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of discoveredURLs) {
      pages = await crawlWebsite(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Error crawling ${currentURL}: ${err.message}`);
  }
  return pages;
}

function extractURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  
  for (const linkElement of linkElements) {
    try {
      if (linkElement.href.slice(0, 1) === "/") {
        // Handle relative URLs
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } else {
        // Handle absolute URLs
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      }
    } catch (err) {
      console.log(`Invalid URL found: ${err.message}`);
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostPath = `${urlObj.hostname}${urlObj.pathname}`;

  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeURL,
  extractURLsFromHTML,
  crawlWebsite,
};
