export const getPortions = async (page) => {
    const portions = await page.evaluate(() => {

        const iframe = document.querySelector('[id^="nutrifox-label"]');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        const servingsRaw = iframeDoc.querySelector('div.servings').innerText;
        const servings = servingsRaw.slice(7);

        let calories = iframeDoc.querySelector('span.calories-detail-value').innerText;

        const portions = [servings, calories];

        return portions;
    });
    return portions;
}