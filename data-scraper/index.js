const Subscriber = require("./subscriber");
const Publisher = require("./publisher");
const Queue = require('bull');
const dataScraper = require('./scraper2/index');

const scraperQueue = new Queue('scrape data');

Subscriber.init(scraperQueue);
dataScraper.init();

scraperQueue.process(async function (job, done) {
    const level0 = job.data.link;
    const level1 = await dataScraper.runner(job.data.link.url);

    const data = { level0, level1 };

    // After scraping publish "on-finish-level1"
    Publisher.publish("on-finish-level1", data);

    done();
});