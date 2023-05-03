import React, { useState, useContext, useEffect } from "react";

import { UserContext } from "../../contexts/User"; //import UserContext
import { signIn } from "../../actions/user"; //import sign in action
import { Button } from "./../../Common/Button/Button";
import { isEmailValid, isPasswordValid } from "../../helpers/validate"; //import validation functions
import { History } from "history"; //import History interface
import { CLEAR_ERRORS } from "../../actions/Types";
import { Loading } from "./../../Common/Loading/Loading";
import { LoadingContext } from "../../contexts/Loading"; //import LoadingContext
import "../../styles/signIn.css";
import { TextField } from "./../../Common/TextField/TextField";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

//Interface for props
export const SignIn = (props) => {
  //email variable in the state and setEmail method for updating the token value
  const [email, setEmail] = useState("");
  //password variable in the state and setPassword method for updating the token value
  const [password, setPassword] = useState("");
  //passwordError variable in the state and setPasswordError method for updating the token value
  const [passwordError, setPasswordError] = useState("");
  //emailError variable in the state and setEmailError method for updating the token value
  const [emailError, setEmailError] = useState("");
  //Get the state and the dispatch properties form the UserContext and rename them to userState and userDispatch resp.
  const { state: userState, dispatch: userDispatch } = useContext(UserContext);
  //Get the state and the dispatch properties form the LoadingContext and rename them to loadingState and loadingDispatch resp.
  const { state: loadingState, dispatch: loadingDispatch } =
    useContext(LoadingContext);

  //handleClick method that is executed when the Sign In button is clicked
  const handleClick = () => {
    //check if email is valid
    const emailValid = isEmailValid(email);
    //check if password is valid
    const passwordValid = isPasswordValid(password);
    //If valid, clear error states and execute the signIn action creator
    if (emailValid && passwordValid) {
      setEmailError("");
      setPasswordError("");
      signIn(email, password, props?.history)(userDispatch, loadingDispatch);
      toast.success("login Successfully");
      navigate("/home");
    }
    //if email or password is invalid, set errors in the state for whatever is invalid
    else {
      if (!emailValid) {
        setEmailError("Email is invalid");
      }
      if (!passwordValid) {
        setPasswordError("Password is invalid. Must be atleast 8 characters");
      }
    }
  };

  //useEffect hook that would only run once and check for a token.
  useEffect(() => {
    //Clear all existing erros
    userDispatch({ type: CLEAR_ERRORS });
    //Check if token exists in the localstorage
    if (localStorage.getItem("token")) {
      //if exists, redirect the user to the home page
      props.history?.push("/");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container__1">
      {/* If loadingState has loading as true, show the loader */}
      {loadingState.loading ? <Loading /> : null}
      <div className="form">
        <h2>Sign In</h2>
        <div className="form-content">
          <TextField
            value={email}
            placeholder="Enter Email"
            label="Email"
            handleChange={(e) => setEmail(e.target.value)}
            id="sign-in_email_input_field"
            type="email"
          />
          <p>{emailError}</p>
          <TextField
            value={password}
            placeholder="Enter Password"
            label="Password"
            handleChange={(e) => setPassword(e.target.value)}
            id="sign-in_password_input_field"
            type="password"
          />
          <p>{passwordError}</p>

          <Button
            value="Sign In"
            handleClick={handleClick}
            id="sign-in_button"
          />
          <p>{userState?.error}</p>
        </div>
      </div>
    </div>
  );
};
