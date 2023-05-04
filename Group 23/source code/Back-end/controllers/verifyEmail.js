const api_keys = require('../config/env.config');
const error = require('../errors/index');
const Users = require('../models/user');
const EmailToken = require('../models/email-token');


module.exports.verifyEmail = async (req, res) => {
  const user = await Users.findOne({ _id: req.params.id });
  if (!user) throw new error.BadRequestError('Link/Email is Invalid.');

  const token = await EmailToken.findOne({
    userId: user._id,
    token: req.params.token
  });
  if (!token) throw new error.BadRequestError('Link/Token is Invalid');

  await Users.findOneAndUpdate({ _id: req.params.id }, { verified: true });

  await EmailToken.findOneAndDelete({
    userId: user._id,
    token: req.params.token
  });

  res.status(200).json({ success: true, message: 'Email Verified Successfully' });
}