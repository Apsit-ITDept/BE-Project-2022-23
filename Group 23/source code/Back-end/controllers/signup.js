const api_keys = require('../config/env.config');
const error = require('../errors/index');
const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');

// For Mail
const EmailToken = require('../models/email-token');
const crypto = require('crypto');
const sendMail = require('../config/nodemailer.config');

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new error.BadRequestError('Please provide Valid Email and Password');
  }
  const users = await Users.findOne({ email });
  if (users && bcrypt.compareSync(password, users.password)) {
    const token = await jwt.sign({ user_id: user._id, email }, api_keys.JWT_KEY, { expiresIn: '1d' });
    users.token = token;

    return res.status(200).json({
      msg: "Login is Successful, Use the below token in Headers \"Authorization: Bearer <token>\" on the http://localhost:5000/dashboard endpoint for accessing data",
      data: users
    });
  } else {
    throw new error.UnauthenticatedError('Incorrect Password or Email');
  }
}


module.exports.register = async (req, res) => {
  let { email, password } = req.body;
  if (!email || !password) {
    throw new error.BadRequestError('Please provide Email and Password');
  }

  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!req.body.email.match(validRegex)) {
    throw new error.BadRequestError('The Provided E-mail is invalid');
  }

  const oldUser = await Users.findOne({ email });

  if (oldUser) {
    throw new error.CustomAPIError('User already Exist please login', 409);
  }

  const salt = bcrypt.genSaltSync(10);
  const ecncryptedPassword = bcrypt.hashSync(password, salt);

  const users = await Users.create({
    email,
    password: ecncryptedPassword,
  })

  let emailtoken = crypto.randomBytes(32).toString("hex");
  await EmailToken.create({ userId: users._id, token: emailtoken });

  const url = `${api_keys.URL}/byexpertise/user/verify/${users._id}/${emailtoken}`;
  await sendMail(users.email, url);

  const token = jwt.sign({ user_id: users._id, email }, api_keys.JWT_KEY, { expiresIn: '1d' });
  users.token = token;

  res.status(201).json({ msg: "User Created", data: users });
}


module.exports.dashboard = async (req, res) => {
  const email = req.user.email;
  const logedUser = await Users.findOne({ email });


  const users = await Users.find({});;
  res.status(200).json({
    User: `Welcome ! ${logedUser.email}, Here is the data u requested.`,
    data: users,
    total: users.length
  });
}