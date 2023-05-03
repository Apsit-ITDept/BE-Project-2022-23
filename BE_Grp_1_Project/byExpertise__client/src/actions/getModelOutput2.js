import { History } from "history";
import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import {
  MODEL_OUTPUT_2,
  MODEL_OUTPUT_2_ERROR,
  CLEAR_MODEL_OUTPUT_2_ERROR,
} from "./Types";
import { Actions } from "../reducers/createCategory";
import { API_URL } from "./serverConnection";
import storeRatings from "./storeRatings";
import getUser from "../helpers/DecodeJwt";

export const getModelOutput2 = () => async (dispatch, loadingDispatch) => {
  try {
    startLoading(loadingDispatch);
    const userData = getUser();
    const data = userData;
    const modelOutput2 = await axios.post(
      `${API_URL}/model/user-data-model`,
      data
    );
    console.log("modelOutput in getModelOutput2", modelOutput2.data.data);
    // localStorage.setItem("modelOutput", modelOutput.data.data);
    storeRatings.setModelOutput2(modelOutput2.data.data);
    stopLoading(loadingDispatch);
    dispatch({
      type: MODEL_OUTPUT_2,
      payload: modelOutput2,
    });
  } catch (err) {
    stopLoading(loadingDispatch);
    dispatch({
      type: MODEL_OUTPUT_2_ERROR,
      payload: err.response.data.message,
    });
  }
};
