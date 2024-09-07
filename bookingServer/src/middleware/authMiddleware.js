const axios = require('axios');
const { AUTH_PATH } = require('../config/serverConfig');

const authorizeUser = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  const response = await axios.get(`${AUTH_PATH}/api/v1/isAuthenticated`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  })

  next();
};

module.exports = { authorizeUser };
