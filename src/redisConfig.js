
const Redis = require('ioredis');

const redis = new Redis({
  host: '127.0.0.1', // Ganti dengan alamat IP WSL
  port: 6379,             // Ganti dengan port Redis yang digunakan di WSL
});

module.exports = redis;
