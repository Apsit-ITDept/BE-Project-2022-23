const express = require("express");
const app = express();
const error = require("./middlewares/error");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("morgan");
const db = require("./db-init/dbConn");
const auth = require("./routes/api/auth");
const user = require("./routes/api/user");
const userCategories = require("./routes/userCategories/userCategories");
const userRecommendation = require("./routes/Recommendations/Recommendations");
const userRatings = require("./routes/userRatings/userRatings");
const pythonModel = require("./routes/pythonModel/pythonModel");
const pythonModel2 = require("./routes/pythonModel/pythonModel2");
const sendUserData = require("./routes/pythonModel/sendUserData");
const coursesData = require("./routes/getCourseData/courseData");
app.use(bodyParser.json());
app.use(cors());
app.disable("etag");
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(logger("common"));

// write your routes below
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/user", userCategories);
app.use("/api/user", userRecommendation);
app.use("/api/model", pythonModel);
app.use("/api/model", pythonModel2);
app.use("/api/model", sendUserData);
app.use("/api/courses", coursesData);
app.use("/api/user", userRatings);
app.use(error);

const port = process.env.PORT || 5000;

db.connect()
  .then((obj) => {
    app.locals.db = obj;
    // obj.done(); // success, release connection;
    if (process.env.NODE_ENV !== "test")
      app.listen(port, () =>
        console.log(`Server is listening at http://localhost:${port}`)
      );
  })
  .catch((error) => {
    console.log("ERROR:", error.message);
  });

module.exports = app;
