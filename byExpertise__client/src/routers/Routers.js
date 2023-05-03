import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Login from "../pages/Login";
// import Signup from "../pages/Signup";
import ProtectedRoute from "./ProtectedRoute";
import InstructorSignup from "./../pages/InstructorSignup";
import InstructorProfilePage from "../pages/InstructorProfilePage";
import StudentProfilepage from "../pages/StudentProfilePage";
import CategoriesPopup from "../components/UI/CategoriesPopup";
import AdminPage from "../pages/AdminPage";
import DemoContentPage from "./../pages/DemoContentPage";
import ModelOutputContext from "../contexts/ModelOutputContext";
import SignUp from "../pages/SignUp/SignUp";
import { SignIn } from "../pages/SignIn/SignIn";
import { MyContext } from "../contexts/MyContext";

function Routers(coursesDataArr) {
  // console.log("course data in router",coursesDataArr )
  const [data, setData] = useState("");
  const [modelOutput, setModelOutput] = useState("");

  const handleData = (modelOutputDataArr) => {
    console.log("modelOutputDataArr in router", modelOutputDataArr);
    setModelOutput(modelOutputDataArr);
  };

  return (
    <MyContext.Provider value={{ data, setData }}>
      <Routes>
        <Route path="/" element={<Navigate to="home" />} />
        <Route
          path="home"
          element={
            <Home
              modelOutputDataArr={modelOutput}
              coursesDataArr={coursesDataArr}
            />
          }
        />
        <Route path="shop" element={<Shop coursesDataArr={coursesDataArr} />} />
        <Route path="cart" element={<Cart />} />
        <Route
          path="shop/:course_id"
          element={<ProductDetails coursesDataArr={coursesDataArr} />}
        />
        <Route
          path="checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<SignIn />} />
        <Route path="signup" element={<SignUp sendData={handleData} />} />
        <Route path="instructorSignup" element={<InstructorSignup />} />
        <Route
          path="instructorProfilePage"
          element={<InstructorProfilePage />}
        />
        <Route path="studentProfilepage" element={<StudentProfilepage />} />
        <Route path="test" element={<CategoriesPopup />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="demoContentPage" element={<DemoContentPage />} />
      </Routes>
    </MyContext.Provider>
  );
}

export default Routers;
