const Redis = require('ioredis');
const { REDIS_HOST, REDIS_PORT, REDIS_PASS } = require('./serverConfig');

const redis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASS
});

const startRedis = () => {
  redis.on('connect', () => {
    console.log('Connected to Redis!');
  });
  
  redis.on('error', (err) => {
    console.error('Redis error:', err);
  });
}

module.exports = {
  redis,
  startRedis
}