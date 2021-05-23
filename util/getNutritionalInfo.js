export const getNutritionalInfo = async (page) => {
    const macroNutrients = await page.evaluate(() => {

        const iframe = document.querySelector('[id^="nutrifox-label"]');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
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

        const macroNutrients = {
            fat: fat.childNodes['1'].innerText,
            saturatedFat: saturatedFat.childNodes['1'].innerText,
            sodium: sodium.childNodes['1'].innerText,
            carbs: carbs.childNodes['1'].innerText,
            fiber: fiber.childNodes['1'].innerText,
            sugar: sugar.childNodes['1'].innerText,
            protein: protein.childNodes['1'].innerText,
        }

        return macroNutrients;
    });
    return macroNutrients;
}