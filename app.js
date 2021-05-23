import { dishScraper } from "./util/urlScraper.js";
import { recipeScraper } from "./util/recipeScraper.js";

let mainDishesUrls = [];

const mainDishes = await dishScraper('https://livelytable.com/category/mains/page/1', mainDishesUrls);

const recipe = await recipeScraper('https://livelytable.com/mini-meyer-lemon-tarts/');

console.log(mainDishes);