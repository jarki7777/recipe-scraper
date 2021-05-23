import puppeteer from 'puppeteer';

const scrapRecipe = async (url) => {
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
        steps => steps.map(step => step.innerHTML));

    const notes = await page.$$eval('div.tasty-recipes-notes-body>ul>li',
        notes => notes.map(note => note.textContent));

    const nutritionalInfo = await page.evaluate(() => {

        const iframe = document.getElementById('nutrifox-label-109655');

        // grab iframe"s document object
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        document.querySelectorAll

        const nutrientsData = iframeDoc.querySelectorAll('span.label-nutrient-name');

        const {
            ['0']: fat,
            ['1']: saturatedFat,
            ['2']: sodium,
            ['3']: carbs,
            ['4']: fiber,
            ['5']: sugar,
            ['6']: protein
        } = nutrientsData;

        nutritionalInfo = {
            fat: fat.innerText,
            saturatedFat: saturatedFat.innerText,
            sodium: sodium.innerText,
            carbs: carbs.innerText,
            fiber: fiber.innerText,
            sugar: sugar.innerText,
            protein: protein.innerText,
        }
        
        return nutritionalInfo;
    });

    await browser.close();

    console.log({
        title,
        img: imgs[2],
        prepTime,
        cookTime,
        totalTime,
        portions,
        category,
        method,
        cuisine,
        description,
        ingredients,
        instructions,
        notes,
        nutritionalInfo
    });
};

async function autoScroll(page) {
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 20);
        });
    });
}

scrapRecipe('https://livelytable.com/the-best-easy-pinto-beans/');