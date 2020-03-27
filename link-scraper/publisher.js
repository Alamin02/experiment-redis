const Redis = require('ioredis');

function publish(message, data) {
    pub = new Redis();
    pub.publish(message, data);
}

module.exports = {
    publish
}