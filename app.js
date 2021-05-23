import { dishScraper } from "./util/urlScraper.js";
import { recipeScraper } from "./util/recipeScraper.js";

let mainDishesUrls = [];
let sideDishesUrls = [];
let appetizerDishesUrls = [];
let dessertDishesUrls = [];

await dishScraper('https://livelytable.com/category/mains/page/1', mainDishesUrls);
await dishScraper('https://livelytable.com/category/mains/page/1', sideDishesUrls);
await dishScraper('https://livelytable.com/category/mains/page/1', appetizerDishesUrls);
await dishScraper('https://livelytable.com/category/mains/page/1', dessertDishesUrls);

let dishesUrls = [...mainDishesUrls, ...sideDishesUrls, ...appetizerDishesUrls, ...dessertDishesUrls];

const recipe = await recipeScraper('https://livelytable.com/mini-meyer-lemon-tarts/');

console.log(dishesUrls);