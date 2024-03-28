// middleware/cacheMiddleware.js
const redis = require("redis");
const client = redis.createClient();

client.on("error", (err) => {
  console.error("Redis error:", err);
});

const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;

  client.get(key, (err, data) => {
    if (err) {
      console.error("Redis error:", err);
      return next();
    }

    if (data !== null) {
      console.log("Data ditemukan dalam cache Redis");
      res.json(JSON.parse(data));
    } else {
      res.jsonResponse = res.json;
      res.json = (body) => {
        client.setex(key, 3600, JSON.stringify(body)); // Set cache dengan waktu kadaluarsa 1 jam (3600 detik)
        res.jsonResponse(body);
      };
      next();
    }
  });
};

module.exports = cacheMiddleware;
