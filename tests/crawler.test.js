const { test, expect } = require('@jest/globals');
const URLUtils = require('../src/utils/URLUtils');
const CrawlerService = require('../src/services/CrawlerService');

test('normalizeURL strip protocol', () => {
    const input = 'https://example.com/path';
    const actual = URLUtils.normalizeURL(input);
    const expected = 'example.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip trail', () => {
    const input = 'https://example.com/path/';
    const actual = URLUtils.normalizeURL(input);
    const expected = 'example.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL capitals', () => {
    const input = 'https://EXAMPLE.com/path';
    const actual = URLUtils.normalizeURL(input);
    const expected = 'example.com/path';
    expect(actual).toEqual(expected);
});

test('normalizeURL strip http', () => {
    const input = 'http://example.com/path';
    const actual = URLUtils.normalizeURL(input);
    const expected = 'example.com/path';
    expect(actual).toEqual(expected);
});

test('extractURLsFromHTML absolute', () => {
    const crawlerService = new CrawlerService();
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://example.com/path/">
                Example Website
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://example.com/path/';
    const actual = crawlerService.extractURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://example.com/path/'];
    expect(actual).toEqual(expected);
});

test('extractURLsFromHTML relative', () => {
    const crawlerService = new CrawlerService();
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">
                Example Website
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://example.com';
    const actual = crawlerService.extractURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ['https://example.com/path/'];
    expect(actual).toEqual(expected);
});

test('extractURLsFromHTML both urls', () => {
    const crawlerService = new CrawlerService();
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://example.com/path1/">
                Example Website Path One
            </a>
            <a href="/path2/">
                Example Website Path Two
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://example.com';
    const actual = crawlerService.extractURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        'https://example.com/path1/',
        'https://example.com/path2/',
    ];
    expect(actual).toEqual(expected);
});

test('extractURLsFromHTML invalid', () => {
    const crawlerService = new CrawlerService();
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">
                invalid url
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://example.com';
    const actual = crawlerService.extractURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
}); 