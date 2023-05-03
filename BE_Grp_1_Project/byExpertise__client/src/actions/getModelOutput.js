import { History } from "history";
import { startLoading, stopLoading } from "./loading";
import { Actions as LoadingActions } from "../reducers/loading";
import axios from "axios";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  CLEAR_CREATE_CATEGORY_ERROR,
  MODEL_OUTPUT,
  MODEL_OUTPUT_ERROR,
  CLEAR_MODEL_OUTPUT_ERROR,
} from "./Types";
import { Actions } from "../reducers/createCategory";
import { API_URL } from "./serverConnection";
import store from "./store";

export const getModelOutput = () => async (dispatch, loadingDispatch) => {
  try {
    startLoading(loadingDispatch);
    const modelOutput = await axios.get(`${API_URL}/model/run-python`, {});
    store.setModelOutput(modelOutput.data.data);
    stopLoading(loadingDispatch);
    dispatch({
      type: MODEL_OUTPUT,
      payload: modelOutput,
    });
  } catch (err) {
    stopLoading(loadingDispatch);
    dispatch({
      type: MODEL_OUTPUT_ERROR,
      payload: err.response.data.message,
    });
  }
};
