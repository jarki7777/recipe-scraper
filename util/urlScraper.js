import puppeteer from 'puppeteer';
import { autoScroll } from './autoscroll.js';

export var dishesUrls = [];

export const dishScraper = async (url) => {
    const browser = await puppeteer.launch({
        args: ["--disable-web-security"]
    });
    const page = await browser.newPage();
    await page.goto(url);
    await page.setViewport({
        width: 1200,
        height: 850
    });

    await autoScroll(page);

    const urls = await page.$$eval('article>header>a[href]',
        urls => urls.map(url => url.getAttribute('href')));

    try {
        dishesUrls = dishesUrls.concat(urls);

        const nextPage = await page.$eval('li.pagination-next>a', el => el.getAttribute('href'));

        let nextPageNumber = parseInt(url.slice(-1)) + 1;
        let newUrl = url.slice(0, -1) + nextPageNumber;

        if (nextPage) {
            await browser.close();
            await dishScraper(newUrl);
        }
    } catch (e) {
        console.log('No more pages to scrap');
    }
    return dishesUrls;
}

