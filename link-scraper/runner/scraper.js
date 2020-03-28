const Chrome = require("../lib/chrome");
const Extractor = require("../lib/extractor");

class Scraper extends Chrome {
	init = async (startUrl, dataUpdateCallback) => {
		await this.launch();
		await this.navigate(startUrl);

		this.extractor = new Extractor(dataUpdateCallback);

		// TODO: Handle these conditions
		this.page.on("close", () => {});
		this.page.on("error", () => {});
	};

	stop = async () => {
		await this.close();
	};

	scrape = async () => {
		const links = await this.getLinks(".ant-card-head-title > a");

		if (links.length > 0) {
			links.map(link => this.extractor.insertData(link));

			await Promise.all([
				await this.click(".navigate-next"),
				await this.wait(".navigate-next")
			]);

			await this.scrape();
			return;
		} else {
			this.stop();
			return;
		}
	};
}

module.exports = Scraper;
