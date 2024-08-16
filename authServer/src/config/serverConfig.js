const dotenv = require('dotenv');
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    JWT_SECRET:process.env.JWT_SECRET
}