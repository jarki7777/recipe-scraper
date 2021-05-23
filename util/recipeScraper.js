import puppeteer from 'puppeteer';
import { autoScroll } from './autoscroll.js';
import { getNutritionalInfo } from './getNutritionalInfo.js';

export const recipeScraper = async (url) => {
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

    const imgs = await page.$$eval('img.lazyloaded[src]',
        imgs => imgs.map(img => img.getAttribute('src')));

    const title = await page.$eval('h1.entry-title', el => el.innerHTML);
    const prepTime = await page.$eval('span.tasty-recipes-prep-time', el => el.innerHTML);
    const cookTime = await page.$eval('span.tasty-recipes-cook-time', el => el.innerHTML);
    const totalTime = await page.$eval('span.tasty-recipes-total-time', el => el.innerHTML);
    const portions = await page.$eval('span[data-unit]', el => el.innerHTML);
    const category = await page.$eval('span.tasty-recipes-category', el => el.innerHTML);
    const method = await page.$eval('span.tasty-recipes-method', el => el.innerHTML);
    const cuisine = await page.$eval('span.tasty-recipes-cuisine', el => el.innerHTML);

    const descriptions = await page.$$eval('div.entry-content>p>span',
        descriptions => descriptions.map(description => description.innerHTML));
    const description = descriptions[0].trim().slice(0, -1);

    const ingredients = await page.$$eval('div.tasty-recipes-ingredients-body>ul>li',
        ingredients => ingredients.map(ingredient => ingredient.textContent));

    const instructions = await page.$$eval('div.tasty-recipes-instructions-body>ol>li',
        steps => steps.map(step => step.textContent));

    const notes = await page.$$eval('div.tasty-recipes-notes-body>ul>li',
        notes => notes.map(note => note.textContent));

    const nutritionalInfo = await getNutritionalInfo(page);

    await browser.close();

    const recipe = {
        "title": title,
        "img": imgs[2],
        "prepTime": prepTime,
        "cookTime": cookTime,
        "totalTime": totalTime,
        "portions": portions,
        "category": category,
        "method": method,
        "cuisine": cuisine,
        "description": description,
        "ingredients": ingredients,
        "instructions": instructions,
        "notes": notes,
        "nutritionalInfo": nutritionalInfo
    };

    return recipe;
}