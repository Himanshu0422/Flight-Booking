const dotenv = require('dotenv');
require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    EMAIL_USER:process.env.EMAIL_USER,
    EMAIL_PASS:process.env.EMAIL_PASS,
    JWT_SECRET:process.env.JWT_SECRET,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DIALECT: process.env.DB_DIALECT,
    DB_SSL_CA: process.env.DB_SSL_CA,
    CLIENT_LINK: process.env.CLIENT_LINK,
    SERVER_LINK: process.env.SERVER_LINK,
}