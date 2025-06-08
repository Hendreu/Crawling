const CrawlerController = require('./controllers/CrawlerController');

async function main() {
    if (process.argv.length < 3) {
        console.log('No website provided');
        process.exit(1);
    }
    if (process.argv.length > 3) {
        console.log('Too many command line arguments');
        process.exit(1);
    }

    const baseURL = process.argv[2];
    const crawlerController = new CrawlerController();
    
    try {
        await crawlerController.startCrawling(baseURL);
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

main(); 