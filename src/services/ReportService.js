class ReportService {
    printReport(pages) {
        console.log('==========');
        console.log('REPORT');
        console.log('==========');
        const sortedPages = this.sortPages(pages);
        for (const sortedPage of sortedPages) {
            console.log(`Found ${sortedPage[1]} internal links to ${sortedPage[0]}`);
        }
    }

    sortPages(pages) {
        return Object.entries(pages).sort((a, b) => b[1] - a[1]);
    }
}

module.exports = ReportService; 