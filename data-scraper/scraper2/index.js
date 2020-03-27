const Scraper = require("./lib/scraper");
const bot = new Scraper();

async function init() {
    await bot.create();
}

async function runner(url, dataUpdateCallback) {
    await bot.startPage();

    await bot.init(url, dataUpdateCallback);

    const data = await bot.scrape();

    await bot.closePage();

    return data;
}

async function destroy() {
    await bot.close();
}

module.exports = {
    runner,
    init,
    destroy
};