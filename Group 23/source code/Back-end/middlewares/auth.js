const api_keys = require('../config/env.config');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors/index');
const User = require('../models/user');


const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided')
  }

  const token = authHeader.split(' ')[1]

  try {
    const userData = jwt.verify(token, api_keys.JWT_KEY)
    req.user = { userId: userData.userId, email: userData.email };
    const user = await User.findOne({ email: userData.email });
    if (user.verified) {
      next();
    } else {
      throw new UnauthenticatedError('Email is not Verified.')
    }
  } catch (error) {
    throw new UnauthenticatedError('Not authorized to access this route')
  }
}

module.exports = authenticationMiddleware;