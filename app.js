import { dishScraper } from "./util/urlScraper.js";
import { recipeScraper } from "./util/recipeScraper.js";


const mainDishes = await dishScraper('https://livelytable.com/category/mains/page/1');

const recipe = await recipeScraper('https://livelytable.com/mini-meyer-lemon-tarts/');

console.log(mainDishes);