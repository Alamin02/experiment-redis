const Subscriber = require("./subscriber");
const Publisher = require("./publisher")
const Queue = require('bull');
const scraperRunner = require('./scraper1/index');

const scraperQueue = new Queue('scrape link');

Subscriber.init(scraperQueue)

// Process queue
scraperQueue.process(async function (job, done) {

    const dataUpdateCallback = data => {
        const stringifiedData = JSON.stringify(data)

        // Publish "level1-taks" each time a link is scraped
        Publisher.publish("level1-task", stringifiedData);
    }

    await scraperRunner(dataUpdateCallback);

    // Publish "on-finish-level0"
    Publisher.publish("on-finish-level0", "Level 0 Scraping is done for request - ", job.id);

    done();
});
