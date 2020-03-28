const Redis = require("ioredis");

const { debug } = require("../utils");

function subscriber(queue) {
	const sub = new Redis();
	// Subscribe to "level1-task" and
	// Set event listener for it
	sub.subscribe("level1-task");
	sub.on("message", function(channel, message) {
		switch (channel) {
			case "level1-task":
				const data = JSON.parse(message);
				// Enqueue "level1-task"
				queue.add(data);
				break;
			default:
				debug("Eh?");
				break;
		}
	});
}

module.exports = subscriber;
