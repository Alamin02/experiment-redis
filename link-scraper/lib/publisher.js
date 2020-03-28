const Redis = require("ioredis");

function publisher(message, data) {
	pub = new Redis();
	pub.publish(message, data);
}

module.exports = publisher;
