const Redis = require("ioredis");

function publisher(message, data) {
	const pub = new Redis();
	pub.publish(message, JSON.stringify(data));
}

module.exports = publisher;
