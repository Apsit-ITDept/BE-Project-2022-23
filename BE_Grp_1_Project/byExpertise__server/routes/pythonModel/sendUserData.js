const express = require("express");
const router = express.Router();
const validateUser = require("../../helpers/validateUser");
const generateToken = require("../../helpers/generateToken");
const bcrypt = require("bcryptjs");
const pg = require("../../db-init/dbConn");

const { spawn } = require("child_process");

router.post("/user-data-model", async (req, res, next) => {
  const data = req.body;  
  const pythonProcess = spawn("python", [
    "C:/Users/Lenovo/Documents/GitHub/ByExpertise_prototype/python/models/model_2.py",
    JSON.stringify(data),
  ]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(`Python stdout: ${data}`);
    res.status(200).json({ data: `${data}` });
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(`Python stderr: ${data}`);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python process exited with code ${code}`);
  });
});

module.exports = router;

// app.get("/run-python", (req, res) => {
//   const pythonProcess = spawn("python", [
//     "C:UsersLenovoDocumentsGitHubByExpertise_prototypepythonmodelsmodel_1.py",
//   ]);

//   pythonProcess.stdout.on("data", (data) => {
//     console.log(`stdout: ${data}`);
//   });

//   pythonProcess.stderr.on("data", (data) => {
//     console.error(`stderr: ${data}`);
//   });

//   pythonProcess.on("close", (code) => {
//     console.log(`child process exited with code ${code}`);
//   });
// });
