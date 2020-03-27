const Redis = require('ioredis');

function init(queue) {
    const sub = new Redis();

    // Subscribe and set "level0-task" listener
    sub.subscribe("level0-task");

    sub.on("message", function (channel, message) {
        switch (channel) {
            case "level0-task":
                console.log(message);
                console.log("level 0 taks added t0 queue");

                // Enqueue when level0 task is recieved
                queue.add({});  // This is empty because the scraper is hardcoded
                break;

            default:
                console.log("Eh?");
                break;
        }
    });
};

module.exports = {
    init
}