class Page {
    constructor(url, visitCount = 0) {
        this.url = url;
        this.visitCount = visitCount;
    }

    incrementVisit() {
        this.visitCount++;
    }
}

module.exports = Page; 