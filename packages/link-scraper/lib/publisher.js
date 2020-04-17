const Redis = require('ioredis');

function publisher(message, data) {
  const pub = new Redis();
  pub.publish(message, data);
}

module.exports = publisher;
