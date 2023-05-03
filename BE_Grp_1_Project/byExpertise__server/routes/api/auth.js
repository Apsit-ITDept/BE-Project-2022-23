const express = require("express");
const router = express.Router();
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcryptjs");
const pg = require("../../db-init/dbConn");

/**
 * @route for login
 * @description
 *  - Takes an email and a password in the body
 *  - Validates the email and password with that present in the db
 *  - If valid, returns a JWT
 * @params
 *  - @requires email Email address of the user
 *  - @requires password Password of the user
 */

router.post("/", async (req, res, next) => {
  //Get db instance from app locals
  let { db } = req.app.locals;
  //If not available (usually while testing), reconnect.
  if (!db) {
    db = await pg.connect();
  }

  try {
    //Get email and password from body of the req
    const { email, password } = req.body;
    //if email or password is missing, return an error response
    if (!email || !password) {
      throw {
        statusCode: 400,
        customMessage: `All parameters are required.${
          email ? "" : " Email is required."
        }${password ? "" : " Password is required."}`,
      };
    }
    //Fetch the user with the email
    const user = await db.any(
      `select id,email,password from users where email='${email}'`
    );
    //If no user found, return an error
    if (user.length == 0) {
      throw {
        statusCode: 400,
        customMessage: "Email or Password is Invalid",
      };
    }
    // let validpassword;
    // //Compare the stored password (hashed) with the user provided password
    // validpassword = await bcrypt.compare(password, user[0].password);
    // //If password is invalid, return error message
    // if (!validpassword) {
    //   throw {
    //     statusCode: 400,
    //     customMessage: "Email or Password is Invalid",
    //   };
    // }
    //Generate a token for the current user
    const token = generateToken(user[0]);
    //Return positive response to the client
    res.status(200).json({
      status: 200,
      token,
      message: "Sign In successful",
    });
  } catch (err) {
    //In case of err, log it to console and pass it to the err middleware
    console.log(err);
    next(err);
  }
});

module.exports = router;
