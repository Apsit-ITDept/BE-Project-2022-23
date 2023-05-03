import { History } from "history";
import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  CLEAR_ERRORS,
  LOGOUT,
} from "./Types";
import { Actions } from "../reducers/user";
import { API_URL } from "./serverConnection";
import getUser from "./../helpers/DecodeJwt";

export const signIn =
  (email, password, history) => async (dispatch, loadingDispatch) => {
    try {
      startLoading(loadingDispatch);
      const result = await axios.post(`${API_URL}/auth`, { email, password });
      const { token } = result.data;
      localStorage.setItem("token", token);
      stopLoading(loadingDispatch);
      dispatch({
        type: SIGN_IN,
        payload: token,
      });
      clearErrors(dispatch);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      history?.push("/");
    } catch (err) {
      stopLoading(loadingDispatch);
      const error = err;
      dispatch({
        type: SIGN_IN_ERROR,
        payload: error.response.data.message,
      });
    }
  };

export const getUSerId = () => async (dispatch, loadingDispatch) => {
  try {
    startLoading(loadingDispatch);
    const result = await axios.get(`${API_URL}/user/get-user`, {});
    console.log("result getUserId", result);
  } catch (err) {
    stopLoading(loadingDispatch);
    dispatch({
      type: SIGN_UP_ERROR,
      payload: err.response.data.message,
    });
  }
};

export const signUp =
  (fname, lname, email, password, history) =>
  async (dispatch, loadingDispatch) => {
    try {
      startLoading(loadingDispatch);
      const result = await axios.post(`${API_URL}/user`, {
        email,
        password,
        fname,
        lname,
      });
      toast.success("Account created Successfully");
      const userData = getUser();
      const user_id = parseInt(userData.id) + 1;
      const course_id = 1;
      const ratings = 0;
      console.log("userId", user_id);
      console.log("course_id", course_id);
      console.log("ratings", ratings);

      const sendData = async (user_id, course_id, ratings) => {
        try {
          const dummyRating = await axios.post(`${API_URL}/user/user-ratings`, {
            user_id,
            course_id,
            ratings,
          });
          console.log(dummyRating.data.message);
        } catch (error) {
          console.error(error);
        }
      };
      sendData(user_id, course_id, ratings);

      const { token } = result.data;
      // const url = `http://localhost:5000/api/user/send-token`;
      // const postData = { data: token };
      // axios
      //   .post(url, postData)
      //   .then((response) => console.log(response.data))
      //   .catch((error) => console.error(error));

      localStorage.setItem("token", token);

      stopLoading(loadingDispatch);
      dispatch({
        type: SIGN_UP,
        payload: token,
      });
      clearErrors(dispatch);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      history?.push("/");
    } catch (err) {
      stopLoading(loadingDispatch);
      dispatch({
        type: SIGN_UP_ERROR,
        payload: err.response.data.message,
      });
      toast.error("Incorrect Input");
    }
  };

export const logout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
  delete axios.defaults.headers.common["Authorization"];
  window.location.reload();
};

export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
