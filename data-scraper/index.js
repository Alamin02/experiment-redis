const Queue = require("bull");

const subscriber = require("./lib/subscriber");
const publisher = require("./lib/publisher");

const dataScraper = require("./runner");

const scraperQueue = new Queue("scrape data");

// Init subscriber
subscriber(scraperQueue);
dataScraper.init();

scraperQueue.process(async function(job, done) {
	const level0 = job.data.link;
	const level1 = await dataScraper.runner(job.data.link.url);
	// After scraping publish "on-finish-level1"
	publisher("on-finish-level1", { level0, level1 });
	done();
});
