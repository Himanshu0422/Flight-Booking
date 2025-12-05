const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('./serverConfig');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,        // Gmail TLS port (Render supports this)
  secure: false,    // important: TLS upgrades later
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS // Must be app password
  },
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 10000
});

module.exports = transporter;
