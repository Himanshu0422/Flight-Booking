const bcrypt = require("bcryptjs");
const { User, Otp } = require("../models/index");
const nodemailer = require('nodemailer');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { EMAIL_USER, EMAIL_PASS, JWT_SECRET, CLIENT_LINK } = require("../config/serverConfig");

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
    const { name, email, password, phone, countryCode } = data;
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
        countryCode,
        type: 0
      });

      return user;
    } catch (error) {
      res.status(500).json({ error: "Signup failed" });
    }
  }

  async updateUser(userId, data) {
    try {
      if (data.email) {
        const existingUser = await User.findOne({
          where: {
            email: data.email,
            id: { [Op.ne] : userId }
          }
        });
        if (existingUser) {
          throw { message: 'Email already taken' };
        }else {
          data = {
            ...data,
            otpVerified: 0
          }
        }
      }
  
      const res = await User.update(data, {
        where: {
          id: userId
        }
      });

      const user = await User.findByPk(userId);

      return user;
    } catch (error) {
      console.log('Something went wrong in repository layer');
      throw { error };
    }
  }

  async validEmail(data) {
    try {
      const user = await User.findOne({
        where: {
          email: data,
          type: 0
        }
      });
      if(!user) {
        return false;
      }
      await this.sendChangePassMail(data);
      return true
    } catch (error) {
      ole.log('Something went wrong in repository layer');
      throw { error };
    }
  }

  async sendChangePassMail(email) {
    try {
      await transporter.sendMail({
        to: email,
        subject: 'Change Password Mail',
        text: `Your Change Password link is ${CLIENT_LINK}change-password?email=${email}`
      });
    } catch (error) {
      
    }
  }

  async changePassword(email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      let user = await User.findOne({ where: { email } });
      user.password = hashedPassword;
      await user.save();

      return true;
    } catch (error) {
      console.log('Something went wrong in repository layer');
      throw {error}
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
  
      const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '7d' });
  
      return {
        success: true,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          countryCode: user.countryCode,
          type: user.type
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
      if(user.type !== 0) {
        return { success: false, message: 'This email is used by other login method.' }
      }
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return { success: false, message: 'Invalid credentials' }
      }
      if(!user.otpVerified){
        return {success: false, message: 'Otp not verified', otpVerified:false};
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: '7d' });
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          countryCode: user.countryCode,
          type: user.type
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
      const user = await User.findByPk(id);
      if (!user) return {success: false, message: 'No user found'}
      return {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          countryCode: user.countryCode,
          type: user.type
        },
      }
    } catch (error) {
      console.log('Something went wrong in repository layer');
      throw {error}
    }
  
  }

  async googleCallback(req, res){
    const token = jwt.sign({ id: req.user.id }, JWT_SECRET_KEY, { expiresIn: '7d' });
    res.redirect(`${CLIENT_LINK}auth/google/callback?token=${token}`);
  }; 
}


module.exports = UserRepository