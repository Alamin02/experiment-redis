const Redis = require('ioredis');

function publish(message, data) {
    const pub = new Redis();
    data = JSON.stringify(data);
    pub.publish(message, data);
}

module.exports = {
    publish
}