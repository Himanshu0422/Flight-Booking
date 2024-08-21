const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('./serverConfig');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
  }
});

module.exports = transporter