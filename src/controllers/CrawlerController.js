const CrawlerService = require('../services/CrawlerService');
const ReportService = require('../services/ReportService');

class CrawlerController {
    constructor() {
        this.crawlerService = new CrawlerService();
        this.reportService = new ReportService();
    }

    async startCrawling(baseURL) {
        try {
            console.log(`Starting crawl of ${baseURL}`);
            const pages = await this.crawlerService.crawlWebsite(baseURL, baseURL, {});
            this.reportService.printReport(pages);
            return pages;
        } catch (error) {
            console.error('Error during crawling:', error.message);
            throw error;
        }
    }
}

module.exports = CrawlerController; 