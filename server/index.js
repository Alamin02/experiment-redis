const express = require("express");
const Redis = require("ioredis");
const DataStore = require("nedb");
const debug = require("debug")("exp:redis:server");

const port = process.env.SERVER_PORT || 3000;
const pub = new Redis();
const sub = new Redis();
const db = new DataStore({ filename: "./db/database" });

const app = express();

// Init db
db.loadDatabase(err => err && debug(err));

// User request end point
app.get("/", (req, res) => {
	res.send("Scraping!");
	// Publish "level0-task"
	pub.publish("level0-task", "Level 0 task sent");
});

// Subscribe and set listener for "on-finish-level1" and "on-finish-level0"
sub.subscribe("on-finish-level1", "on-finish-level0");

sub.on("message", function(channel, message) {
	if (channel === "on-finish-level1") {
		const data = JSON.parse(message);

		db.insert(data, function(err, newData) {
			debug(newData);
		});
	} else if (channel === "on-finish-level0") {
		debug(message);
	}
});

app.listen(port, () => debug(`Server is listening on port ${port}!`));
