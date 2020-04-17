const Scraper = require('./scraper');

async function runner(dataUpdateCallback) {
  try {
    const bot = new Scraper();
    const url =
      'https://scraper-playground.netlify.com/#/0?rand=true&sliceLimit=10';
    await bot.init(url, dataUpdateCallback);
    await bot.scrape();
    await bot.close();
  } catch (error) {
    console.log(error);
  }
}

module.exports = runner;
