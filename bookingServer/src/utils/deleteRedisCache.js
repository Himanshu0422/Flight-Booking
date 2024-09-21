const { redis } = require("../config/redis");

const deletePaginatedBookingCache = async (user_id) => {
  try {
      const pattern = `bookings:user:${user_id}:page:*`;
      let cursor = '0';
      let keys = [];

      do {
          const result = await redis.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
          cursor = result[0];
          keys = result[1];

          if (keys.length > 0) {
              await redis.del(...keys);
          }

      } while (cursor !== '0');

      console.log(`Deleted cache for user: ${user_id}`);
  } catch (error) {
      console.error('Error deleting paginated booking cache:', error);
  }
};

module.exports = {
  deletePaginatedBookingCache
}