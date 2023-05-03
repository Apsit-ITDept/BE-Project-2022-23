const express = require("express");
const router = express.Router();
const validateUser = require("../../helpers/validateUser");
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcryptjs");
const pg = require("../../db-init/dbConn");

const { spawn } = require("child_process");

router.get("/run-python-2", async (req, res, next) => {
  const pythonProcess = await spawn("python", [
    "C:/Users/Lenovo/Documents/GitHub/ByExpertise_prototype/python/models/model_2.py",
  ]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
    res.status(200).json({ data: `${data}` });
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

module.exports = router;


