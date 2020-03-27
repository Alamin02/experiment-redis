const Scraper = require("./lib/scraper");

async function runner(dataUpdateCallback) {
    const bot = new Scraper();

    url = "https://scraper-playground.netlify.com/#/0?rand=true&sliceLimit=10"

    await bot.init(url, dataUpdateCallback);

    await bot.scrape();

    await bot.close();
}

module.exports = runner;