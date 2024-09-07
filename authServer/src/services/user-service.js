const { JWT_SECRET } = require("../config/serverConfig");
const UserRepository = require("../repository/user-repository");
const jwt = require('jsonwebtoken');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(data) {
    try {
      const user = await this.userRepository.createUser(data);
      return user;
    } catch (error) {
      console.log('Something went wrong at service layer');
      throw { error };
    }
  }

  async updateUser(data) {
    try {
      const userId = data.id;
      const { id: _, ...restData } = data;
      const user = await this.userRepository.updateUser(userId, restData);
      return user;
    } catch (error) {
      console.log('Something went wrong at service layer');
      throw { error };
    }
  }

  async sendOtp(data) {
    try {
      const otp = await this.userRepository.sendOtp(data);
      return otp;
    } catch (error) {
      console.log('Something went wrong at service layer');
      throw { error };
    }
  }

  async verifyOtp(data) {
    try {
      const response = await this.userRepository.verifyOtp(data);
      return response;
    } catch (error) {
      console.log('Something went wrong at service layer');
      throw { error };
    }
  }

  async login(data) {
    try {
      const response = await this.userRepository.login(data);
      return response;
    } catch (error) {
      console.log('Something went wrong at service layer');
      throw { error };
    }
  }

  async getUser(id) {
    try {
      const response = await this.userRepository.getUser(id);
      return response;
    } catch (error) {
      console.log('Something went wrong at service layer');
      throw { error };
    }
  }

  async verifyToken(token) {
    try {
      const response = this.tokenVerification(token);
      if (!response) {
        throw { error: 'Invalid token' }
      }
      const user = await this.userRepository.getUser(response.id);
      if(!user) {
          throw {error: 'No user with the corresponding token exists'};
      }
      return user.user.id;
    } catch (error) {
      console.log("Something went wrong in the auth process");
      throw error;
    }
  }

  tokenVerification(token) {
    try {
      const response = jwt.verify(token, JWT_SECRET);
      return response;
    } catch (error) {
      console.log("Something went wrong in token validation", error);
      throw error;
    }
  }

  async googleCallback(req, res) {
    try {
      const response = await this.userRepository.googleCallback(req, res);
    } catch (error) {
      console.log('Something went wrong at service layer');
      throw { error };
    }
  }
}

module.exports = UserService