import { recipeScraper } from "./util/recipeScraper.js";

const recipe = await recipeScraper('https://livelytable.com/mini-meyer-lemon-tarts/');

console.log(recipe);