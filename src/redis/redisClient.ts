import Redis from 'ioredis';

// Create Redis client and connect to Docker container
const redisClient = new Redis({
  host: 'localhost', // Docker container is running on localhost
  port: 6379, // Default Redis port
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

export default redisClient;
