import puppeteer from 'puppeteer';
import { autoScroll } from './autoscroll.js';
import { saveImg } from './downloadImage.js';
import { getNutritionalInfo } from './getNutritionalInfo.js';
import { getPortions } from './getPortions.js';
import { makeDocument } from './makeDocument.js';

export const recipeScraper = async (url) => {
    try {
        const browser = await puppeteer.launch({
            args: ["--disable-web-security"]
        });
        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);
        await page.goto(url, {
            waitUntil: 'load',
            timeout: 0
        });
        await page.setViewport({
            width: 1200,
            height: 850
        });

        await autoScroll(page);

        const imgs = await page.$$eval('img.lazyloaded[src]',
            imgs => imgs.map(img => img.getAttribute('src')));

        let img = imgs[2].slice(51);
        img = img.replace(/\//g, '-');
        img = img.replace('?ssl=1', '');        

        const title = await page.$eval('h1.entry-title', el => el.innerHTML);

        const prepTime = await page.evaluate(() => {
            let el = document.querySelector('span.tasty-recipes-prep-time');
            return el ? el.innerHTML: 0;
        });

        const cookTime = await page.evaluate(() => {
            let el = document.querySelector('span.tasty-recipes-cook-time');
            return el ? el.innerHTML: 0;
        });
        
        const totalTime = await page.evaluate(() => {
            let el = document.querySelector('span.tasty-recipes-total-time');
            return el ? el.innerHTML: 0;
        });
        
        const category = await page.$eval('span.tasty-recipes-category', el => el.innerHTML);
        const method = await page.$eval('span.tasty-recipes-method', el => el.innerHTML);
        const cuisine = await page.$eval('span.tasty-recipes-cuisine', el => el.innerHTML);

        const description = await page.$eval('#dpsp-post-content-markup ~ p', el => el.innerText);

        const ingredients = await page.$$eval('div.tasty-recipes-ingredients-body>ul>li',
            ingredients => ingredients.map(ingredient => ingredient.textContent));

        const instructions = await page.$$eval('div.tasty-recipes-instructions-body>ol>li',
            steps => steps.map(step => step.textContent));

        const notes = await page.$$eval('div.tasty-recipes-notes-body>ul>li',
            notes => notes.map(note => note.textContent));

        const nutritionalInfo = await getNutritionalInfo(page);

        const servesInfo = await getPortions(page);
        
        const recipe = {
            "title": title,
            "img": img,
            "prepTime": prepTime,
            "cookTime": cookTime,
            "totalTime": totalTime,
            "category": category,
            "method": method,
            "cuisine": cuisine,
            "description": description,
            "ingredients": ingredients,
            "instructions": instructions,
            "notes": notes,
            "serves": servesInfo[0],
            "caloriesPerServe": servesInfo[1],
            "nutritionalInfo": nutritionalInfo,
            "timesFavorite": 0,
            "oneStarVotes": 0,
            "twoStarVotes": 0,
            "threeStarVotes": 0,
            "fourStarVotes": 0,
            "fiveStarVotes": 0,
            "totalVotes": 0,
            "totalStars": 0,
            "calification": 0,
            "comments": []
        }

        await browser.close();
        await makeDocument(recipe);
        await saveImg(img, imgs[2]);
        return console.log(`${recipe.title} scraped`);

    } catch(e) {
        console.log(`recipeScraper: ${e}`);
    }
}