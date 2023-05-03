import { START_LOADING, STOP_LOADING } from "./Types";
import { Actions } from "../reducers/loading";

export const startLoading = (dispatch) => {
  dispatch({
    type: START_LOADING,
  });
};

export const stopLoading = (dispatch) => {
  dispatch({
    type: STOP_LOADING,
  });
};
