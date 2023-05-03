const jwt = require("jsonwebtoken");
const config = require("config");
/**
 * @function generateToken to generate a JWT for the user
 * @description
 *  - Accepts a user object as a param
 *  - Uses jwt.sign function to sign a JWT
 *  - Returns the JWT
 */
const generateToken = (user) => {
  //Return a signed token with jwt.sign
  return jwt.sign(
    // payload
    {
      id: user.id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      isAdmin: user.isAdmin,
    },
    // private key (salt) stored in environment variable
    config.get("jwtPrivateKey")
    // expiry optional. Default - never expires
  );
};

module.exports = generateToken;
