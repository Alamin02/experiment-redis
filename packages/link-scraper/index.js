const Queue = require("bull");

const subscriber = require("./lib/subscriber");
const publisher = require("./lib/publisher");
const runner = require("./runner");

const scraperQueue = new Queue("scrape link");

// Init subscriber
subscriber(scraperQueue);

// Process queue
scraperQueue.process(async function(job, done) {
	const dataUpdateCallback = data => {
		// Publish "level1-taks" each time a link is scraped
		publisher("level1-task", JSON.stringify(data));
	};
	await runner(dataUpdateCallback);
	// Publish "on-finish-level0"
	publisher(
		"on-finish-level0",
		"Level 0 Scraping is done for request - ",
		job.id
	);
	done();
});
