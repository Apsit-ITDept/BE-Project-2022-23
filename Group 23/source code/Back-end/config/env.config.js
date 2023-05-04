require('dotenv').config();

// PORT
exports.PORT = process.env.PORT;

// Base URL
exports.URL = process.env.URL;

// Mongo DB
exports.MONGO_URL = process.env.MONGO_URL;

// JWT KEY
exports.JWT_KEY = process.env.JWT_KEY;

// Node mailer
exports.MAIL_ID = process.env.MAIL_ID;
exports.MAIL_PASS = process.env.MAIL_PASS;