import fs from 'fs';

export const saveImg = async (imgPath, imgSrc) => {

    try {
        const filePath = img;
        if (fs.existsSync(filePath)) return console.log(`${imgPath} already exist`);
        else {
            fs.writeFile(filePath, data, (err) => {
                if (err) throw err;
                console.log(`${recipe.title} writed`);
            });
        }
    } catch (e) {
        console.log(e);
    }
}