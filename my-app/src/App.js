import './App.css'
import Body from "./components/BODY/cvgenerator/Body/Body";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/BODY/LandingPage/LandingPage";
import Login from './components/BODY/Authentication/Pages/Login';
import Register from './components/BODY/Authentication/Pages/Register';
import React from "react";
import Recurter from './components/BODY/RECRUTER/Pages/Recruter';
import Upload from './components/BODY/USER/Pages/Upload'
import User from './components/BODY/USER/Pages/User'
import { Recommnedation } from './components/BODY/USER/Pages/Upload';
import { OtpForm, SurveyForm } from './components/BODY/Authentication/Pages/Forms';
import { EmailVerification, ForgetPassOTP, ForgetPassword, ForgetPasswordForm } from './components/BODY/Authentication/Pages/ForgetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        {/* <Route exact path="/" element={<LandingPage />} /> */}
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/user" element={<User />}/>
        <Route exact path="/recruiter" element={<Recurter />}/>
        <Route exact path="/cvmaker" element={<Body />}/>
        <Route exact path="/upload" element={<Upload />}/>
        <Route exact path='/recommendation' element={<Recommnedation />} />
        <Route exact path='/verifyEmail' element={<EmailVerification />} />
        <Route exact path='/fpOtp' element={<ForgetPassOTP />} />
        <Route exact path='/forgetPassword' element={<ForgetPasswordForm />} />
        <Route exact path='/test' element={<SurveyForm />} />
      </Routes>
    </Router>
  );
}

export default App;