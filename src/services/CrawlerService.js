const { JSDOM } = require('jsdom');
const URLUtils = require('../utils/URLUtils');

class CrawlerService {
    async crawlWebsite(baseURL, currentURL, pages) {
        const baseURLObj = new URL(baseURL);
        const currentURLObj = new URL(currentURL);
        
        if (baseURLObj.hostname !== currentURLObj.hostname) {
            return pages;
        }

        const normalizedURL = URLUtils.normalizeURL(currentURL);
        if (pages[normalizedURL] > 0) {
            pages[normalizedURL]++;
            return pages;
        }

        pages[normalizedURL] = 1;
        console.log(`Crawling: ${currentURL}`);

        try {
            const response = await fetch(currentURL);

            if (response.status > 399) {
                console.log(`Error: HTTP ${response.status} on page ${currentURL}`);
                return pages;
            }

            const contentType = response.headers.get('content-type');
            if (!contentType.includes('text/html')) {
                console.log(`Skipping non-HTML content: ${contentType} on page ${currentURL}`);
                return pages;
            }

            const htmlBody = await response.text();
            const discoveredURLs = this.extractURLsFromHTML(htmlBody, baseURL);

            for (const nextURL of discoveredURLs) {
                pages = await this.crawlWebsite(baseURL, nextURL, pages);
            }
        } catch (err) {
            console.log(`Error crawling ${currentURL}: ${err.message}`);
        }
        return pages;
    }

    extractURLsFromHTML(htmlBody, baseURL) {
        const urls = [];
        const dom = new JSDOM(htmlBody);
        const linkElements = dom.window.document.querySelectorAll('a');
        
        for (const linkElement of linkElements) {
            try {
                if (linkElement.href.slice(0, 1) === '/') {
                    const urlObj = new URL(`${baseURL}${linkElement.href}`);
                    urls.push(urlObj.href);
                } else {
                    const urlObj = new URL(linkElement.href);
                    urls.push(urlObj.href);
                }
            } catch (err) {
                console.log(`Invalid URL found: ${err.message}`);
            }
        }
        return urls;
    }
}

module.exports = CrawlerService; 