const Redis = require("ioredis");

const { debug } = require("../utils");

function subscriber(queue) {
	const sub = new Redis();
	// Subscribe and set "level0-task" listener
	sub.subscribe("level0-task");
	sub.on("message", function(channel, message) {
		switch (channel) {
			case "level0-task":
				debug(message);
				debug("level 0 task added to queue");
				// Enqueue when level0 task is recieved
				queue.add({}); // This is empty because the scraper is hard coded
				break;

			default:
				debug("Eh?");
				break;
		}
	});
}

module.exports = subscriber;
