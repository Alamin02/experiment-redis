const express = require('express')
const Redis = require('ioredis')
const app = express()
const port = 3000
const pub = new Redis()
const sub = new Redis()
const Datastore = require('nedb')
const db = new Datastore({ filename: './database' });

db.loadDatabase(function (err) {    // Callback is optional
    // Now commands will be executed
});

// User request end point
app.get('/', (req, res) => {
    res.send('Scraping!');

    // Publish "level0-task"
    pub.publish("level0-task", "Level 0 task sent")
})

// Subscribe and set listener for "on-finish-level1" and "on-finish-level0"
sub.subscribe("on-finish-level1", "on-finish-level0");

sub.on("message", function (channel, message) {
    if (channel === "on-finish-level1") {
        const data = JSON.parse(message)

        db.insert(data, function (err, newData) {
            console.log(newData);
        })
    }
    else if (channel === "on-finish-level0") {
        console.log(message);
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))