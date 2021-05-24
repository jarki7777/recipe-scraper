import fs from 'fs';

export const makeDocument = async (recipe) => {

    try {
        const filePath = `./data/${recipe.title}.json`;
        if (fs.existsSync(filePath)) return console.log(`${recipe.title} already exist`);
        else {
            const data = JSON.stringify(recipe);
            fs.writeFile(filePath, data, (err) => {
                if (err) throw err;
                console.log(`${recipe.title} writed`);
            });
        }
    } catch (e) {
        console.log(e);
    }
}