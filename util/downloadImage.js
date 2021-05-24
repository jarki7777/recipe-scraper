import fs from 'fs';
import fetch from 'node-fetch';

export const saveImg = async (imgPath, imgSrc) => {

    try {
        const filePath = `./img/${imgPath}`;
        if (fs.existsSync(filePath)) return console.log(`${imgPath} already exist`);
        else {
            const response = await fetch(imgSrc);
            const buffer = await response.buffer();
            fs.writeFile(filePath, buffer, (err) => {
                if (err) return console.log(err);
                console.log(`${imgPath} saved`);
            });
        }
    } catch (e) {
        console.log(e);
    }
}