import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import axios from "axios";
import { API_URL } from "../../actions/serverConnection";

function Layout() {
  const getCoursesData = async () => {
    try {
      const coursesData = await axios.get(
        `${API_URL}/courses/courses-data`,
        {}
      );
      const coursesDataArr = coursesData.data.data;
      // const coursesData = resultID;
      return { coursesDataArr };
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  };

  // call the getUserId function and store the result in a state variable
  const [courseDetails, setCourseDetails] = useState(null);
  const [modelOutputContext, setModelOutputContext] = useState(null);
  useEffect(() => {
    getCoursesData()
      .then((data) => setCourseDetails(data))
      .catch((err) => console.log(err));
  }, []);

  // access newUserValue from the state variable using destructuring
  const { coursesDataArr } = courseDetails || {};

  // console.log("coursesDataArr: ", coursesDataArr);

  return (
    <>
      <Header />
      <div>
        <Routers coursesDataArr={coursesDataArr} />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
