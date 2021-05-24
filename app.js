import { dishScraper } from "./util/urlScraper.js";
import { recipeScraper } from "./util/recipeScraper.js";

process.setMaxListeners(0);

let mainDishesUrls = [];
let sideDishesUrls = [];
let appetizerDishesUrls = [];
let dessertDishesUrls = [];

await dishScraper('https://livelytable.com/category/mains/page/1', mainDishesUrls);
await dishScraper('https://livelytable.com/category/sides/page/1', sideDishesUrls);
await dishScraper('https://livelytable.com/category/appetizers/page/1', appetizerDishesUrls);
await dishScraper('https://livelytable.com/category/desserts/page/1', dessertDishesUrls);

let dishesUrls = [...mainDishesUrls, ...sideDishesUrls, ...appetizerDishesUrls, ...dessertDishesUrls];

for (let url of dishesUrls) {
    await recipeScraper(url);
}
