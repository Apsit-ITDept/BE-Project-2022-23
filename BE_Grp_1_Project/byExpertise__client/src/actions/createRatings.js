import { History } from "history";
import { useState, useContext } from "react";
import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import {
  CREATE_RATING,
  CREATE_RATING_ERROR,
  CLEAR_CREATE_RATING_ERROR,
} from "./Types";
import { Actions } from "../reducers/createCategory";
import { API_URL } from "./serverConnection";

export const createCategory =
  (user_id, courses_id, ratings) => async (dispatch, loadingDispatch) => {
    try {
      startLoading(loadingDispatch);
      const result = await axios.post(`${API_URL}/user/user-ratings`, {
        user_id,
        courses_id,
        ratings,
      });

      stopLoading(loadingDispatch);
      dispatch({
        type: CREATE_RATING,
        payload: result,
      });
      clearErrors(dispatch);
    } catch (err) {
      stopLoading(loadingDispatch);
      dispatch({
        type: CREATE_RATING_ERROR,
        payload: err.response.data.message,
      });
    }
  };

export const clearErrors = (dispatch) => {
  dispatch({
    type: CLEAR_CREATE_RATING_ERROR,
  });
};
