const express = require("express");
const router = express.Router();
const validateUser = require("../../helpers/validateUser");
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcryptjs");
const pg = require("../../db-init/dbConn");

router.get("/courses-data", async (req, res, next) => {
  try {
    //Get db instance from app locals
    let { db } = req.app.locals;
    //If not available (usually while testing), reconnect.
    if (!db) {
      db = await pg.connect();
    }

    //Create a new userCategory in the db
    const coursesData = await db.many(
      `select * from courses_data order by course_id asc`
    );

    if (!coursesData) {
      throw {
        statusCode: 400,
        customMessage: `courses not found`,
      };
    }

    //Return positive response to the client
    res.status(200).json({
      status: 200,
      message: "courses fetched successfully",
      data: coursesData,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
