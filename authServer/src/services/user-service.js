const UserRepository = require("../repository/user-repository");


class UserService{
  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser (data) {
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
      const user = await this.userRepository.updateUser(data);
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