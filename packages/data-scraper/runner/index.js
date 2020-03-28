const Scraper = require("./scraper");

const bot = new Scraper();

async function init() {
	try {
		await bot.create();
	} catch (error) {
		console.log(error);
	}
}

async function runner(url, dataUpdateCallback) {
	try {
		await bot.startPage();
		await bot.init(url, dataUpdateCallback);
		const data = await bot.scrape();
		await bot.closePage();
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function destroy() {
	try {
		await bot.close();
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	runner,
	init,
	destroy
};
