const UserService = require("../services/user-service");


const userService = new UserService();

const createUser = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    if (response.success === false) {
      return res.status(401).json({
        data: {},
        success: false,
        message: response.message,
      });
    }
    return res.status(201).json({
      data: response,
      success: true,
      err: {},
      message: 'Successfully created a user'
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Not able to create a user',
      err: error
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.body);
    return res.status(200).json({
      data: user,
      success: true,
      err: {},
      message: 'Successfully updated the user'
    })
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      message: error.error.error.message || 'Not able to update user',
      err: error
    });
  }
}

const sendOtp = async (req, res) => {
  try {
    const response = await userService.sendOtp(req.body);
    if (response.success === false) {
      return res.status(401).json({
        data: {},
        success: false,
        message: response.message,
      });
    }
    return res.status(201).json({
      data: response,
      success: true,
      err: {},
      message: 'Otp sent successfully'
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Not able to send otp',
      err: error
    });
  }
}

const verifyOtp = async (req, res) => {
  try {
    console.log(req.body);
    const response = await userService.verifyOtp(req.body);
    if (response.success === false) {
      return res.status(401).json({
        data: {},
        success: false,
        message: response.message,
      });
    }
    return res.status(200).json({
      data: response,
      success: true,
      err: {},
      message: 'Otp verified'
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Not able to verify otp',
      err: error
    });
  }
}

const login = async (req, res) => {
  try {
    const response = await userService.login(req.body);
    if (response.success === false) {
      return res.status(401).json({
        data: {},
        success: false,
        message: response.message,
        ...(response.otpVerified !== null && response.otpVerified !== undefined ? { otpVerified: response.otpVerified } : {})
      });
    }
    return res.status(201).json({
      data: response,
      success: true,
      err: {},
      message: 'Login succcesfull'
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Login failed',
      err: error
    });
  }
}

const getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    if (user.success === false) {
      return res.status(400).json({
        data: {},
        success: true,
        err: {},
        message: user.message
      })
    }
    return res.status(201).json({
      data: user,
      success: true,
      err: {},
      message: 'Fetched user successfuly'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'User fetching failed',
      err: error
    });
  }
}

const verifyToken = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const response = await userService.verifyToken(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: 'user is authenticated and token is valid'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong',
      data: {},
      success: false,
      err: error
    });
  }
}

const googleCallback = async (req, res) => {
  try {
    const googleSign = await userService.googleCallback(req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: 'Login failed',
      err: error
    });
  }
}

module.exports = {
  createUser,
  updateUser,
  sendOtp,
  verifyOtp,
  login,
  googleCallback,
  getUser,
  verifyToken
}