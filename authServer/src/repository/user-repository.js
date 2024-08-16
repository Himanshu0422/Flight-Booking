const bcrypt = require("bcryptjs");
const { User, Otp } = require("../models/index");
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { EMAIL_USER, EMAIL_PASS, JWT_SECRET } = require("../config/serverConfig");

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

const JWT_SECRET_KEY = JWT_SECRET;

class UserRepository {
  async createUser(data) {
    const { name, email, password, phone } = data;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = await User.findOne({ where: { email } });
      if(user){
        return {success:false, message: 'User already present'}
      }
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone,
      });

      return user;
    } catch (error) {
      res.status(500).json({ error: "Signup failed" });
    }
  }

  async sendOtp(data) {
    const { email } = data;
    try {
      const otpCode = Math.floor(10000 + Math.random() * 90000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      const user = await User.findOne({ where: { email } });
      if (user) {
        await Otp.create({
          user_id: user.id,
          otp_code: otpCode,
          expires_at: expiresAt,
          is_used: false
        });

        await transporter.sendMail({
          to: email,
          subject: 'Your OTP Code',
          text: `Your OTP code is ${otpCode}`
        });

        return user;
      } else {
        return {success: false, message: 'User not found'}
      }
    } catch (error) {
      console.log('Something went wrong in repository layer');
      throw {error}
    }
  }

  async verifyOtp(data) {
    const { email, otp } = data;
  
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { success: false, message: 'User not found' };
      }
  
      const otpRecord = await Otp.findOne({
        where: {
          user_id: user.id,
          otp_code: otp,
          expires_at: { [Op.gt]: new Date() },
          is_used: false
        }
      });
  
      if (!otpRecord) {
        return { success: false, message: 'Invalid or expired OTP' };
      }
  
      otpRecord.is_used = true;
      user.otpVerified = true;
      await user.save();
      await otpRecord.save();
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
  
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        token: token
      };
    } catch (error) {
      console.log('Something went wrong in repository layer');
      throw { error };
    }
  }
  

  async login(data) {
    const { email, password } = data;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false, message: 'Invalid credentials' }
      }
      if(!user.otpVerified){
        return {success: false, message: 'Otp not verified', otpVerified:false};
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
        token: token
      }
    } catch (error) {
      console.log('Something went wrong in repository layer');
      throw {error}
    }
  }

  async getUser(id){
    try {
      console.log(id);
      const user = await User.findByPk(id);
      if (!user) return {success: false, message: 'No user found'}
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone
        },
      }
    } catch (error) {
      console.log('Something went wrong in repository layer');
      throw {error}
    }
  
  }

  async googleCallback(req, res){
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET_KEY, { expiresIn: '1h' });
    res.redirect(`http://localhost:3000/auth/google/callback?token=${token}`);
  }; 
}


module.exports = UserRepository