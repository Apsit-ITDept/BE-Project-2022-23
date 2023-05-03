const express = require("express");
const router = express.Router();
const validateUser = require("../../helpers/validateUser");
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcryptjs");
const pg = require("../../db-init/dbConn");

router.post("/user-ratings", async (req, res, next) => {
  try {
    //Get db instance from app locals
    let { db } = req.app.locals;
    //If not available (usually while testing), reconnect.
    if (!db) {
      db = await pg.connect();
    }

    //Get email, password and name from the req body
    const { user_id, course_id, ratings } = req.body;
    //if email, name or password is missing, return an error response
    if (!user_id || !course_id) {
      throw {
        statusCode: 400,
        customMessage: `All parameters are required.${
          user_id ? "" : " user_id is required."
        }${course_id ? "" : " course_id is required."}`,
      };
    }

    //If not, validate the data send by the client
    const userRatings = { user_id, course_id, ratings };

    console.log("userCategories", userRatings);

    //Create a new userCategory in the db
    const newUserRatings = await db.one(
      `insert into user_ratings(user_id, course_id, ratings) values(${user_id}, ${course_id}, ${ratings}) returning user_id`
    );

    //Return positive response to the client
    res.status(200).json({
      status: 200,
      message: "rating added successfully",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
