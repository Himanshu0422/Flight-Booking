const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  FLIGHT_SERVICE_PATH: process.env.FLIGHT_SERVICE_PATH,
  RAZORPAY_KEY: process.env.RAZORPAY_KEY,
  RAZORPAY_SECRET: process.env.RAZORPAY_SECRET,
  EMAIL_USER: process.env.EMAIL_USER,
  EMAIL_PASS: process.env.EMAIL_PASS,
  STRIPE_KEY: process.env.STRIPE_KEY,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_DATABASE: process.env.DB_DATABASE,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_DIALECT: process.env.DB_DIALECT,
  SERVER_LINK: process.env.SERVER_LINK,
}