const express = require("express");
const router = express.Router();
const validateUser = require("../../helpers/validateUser");
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcryptjs");
const pg = require("../../db-init/dbConn");

/**
 * @route for Sign Up
 * @description
 *  - Takes an email and a password along with first and last name in the body
 *  - Checks if email already exists
 *  - If not, creates a new user and returns a JWT
 * @params
 *  - @requires email Email address of the user
 *  - @requires password Password of the user
 *  - @requires fname First Name of the user
 *  - @requires lname Last Name of the user
 */

router.post("/", async (req, res, next) => {
  try {
    //Get db instance from app locals
    let { db } = req.app.locals;
    //If not available (usually while testing), reconnect.
    if (!db) {
      db = await pg.connect();
    }

    //Get email, password and name from the req body
    const { email, password, fname, lname } = req.body;
    //if email, name or password is missing, return an error response
    if (!email || !password || !fname || !lname) {
      throw {
        statusCode: 400,
        customMessage: `All parameters are required.${
          email ? "" : " Email is required."
        }${password ? "" : " Password is required."}${
          fname ? "" : " Name is required."
        }${fname ? "" : " Name is required."}`,
      };
    }
    //Look for an existing user from the database
    const existingUser = await db.any(
      `select email,password from users where email='${email}'`
    );
    console.log(existingUser);
    //If user exists, return an error
    if (existingUser.length > 0) {
      throw {
        statusCode: 400,
        customMessage: "Email already in use.",
      };
    }
    //If not, validate the data send by the client
    const user = {
      email,
      password,
      fname,
      lname,
    };
    //Validating user data
    if (!validateUser(user)) {
      throw {
        statusCode: 400,
        customMessage: "Some parameters are invalid.",
      };
    }
    // //If valid, create hashed password
    // const salt = bcrypt.genSaltSync(10);
    // const hashedPassword = await bcrypt.hash(password, salt);
    //Create a new user in the db
    const newUser = await db.one(
      `insert into users(email,fname,lname,password) values('${email}','${fname}','${lname}','${password}') returning id`
    );
    //Add the id to the user object
    user.id = newUser.id;

    console.log("in user api", newUser.id);
    //Create a token for the user
    const token = generateToken(user);
    //Return positive response to the client
    res.status(200).json({
      status: 200,
      token,
      newUser,
      message: "Sign Up successful",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/get-user", async (req, res, next) => {
  try {
    let { db } = req.app.locals;
    //If not available (usually while testing), reconnect.
    if (!db) {
      db = await pg.connect();
    }
    const getUSerId = await db.one(
      `SELECT id FROM users ORDER BY id DESC LIMIT 1 `
    );
    //Add the id to the user object

    console.log("in user api", getUSerId.id);

    //Return positive response to the client
    res.status(200).json({
      status: 200,

      getUSerId,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

/**
 * @route for Deleting test users
 * @description
 *  - Deletes all users having email id as test
 */

router.delete("/test", async (req, res, next) => {
  try {
    //Get db instance from app locals
    let { db } = req.app.locals;
    //If not available (usually while testing), reconnect.
    if (!db) {
      db = await pg.connect();
    }

    const result = await db.any(
      `delete from users where email like '%@test.%'`
    );
    console.log(result);
    res.status(200).send("Deleted all test users");
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
