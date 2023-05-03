//import the types of actions supported
import {
  MODEL_OUTPUT,
  MODEL_OUTPUT_ERROR,
  CLEAR_MODEL_OUTPUT_ERROR,
} from "../actions/Types";

//Actions type to accept either SIGN_IN, SIGN_UP, SIGN_IN_ERROR or SIGN_UP_ERROR types with a payload
//or CLEAR_ERRORS or LOGOUT types without a payload
export const Actions = {
  MODEL_OUTPUT: MODEL_OUTPUT,
  MODEL_OUTPUT_ERROR: MODEL_OUTPUT_ERROR,
  CLEAR_MODEL_OUTPUT_ERROR: CLEAR_MODEL_OUTPUT_ERROR,
};

//UserInterface to define the State type for the state of the reducer
const UserInterface = {
  token: null,
  error: null,
};

//State type for defining the state of the reducer
export const State = UserInterface;

//Initial state of the reducer of type State
export const initialState = {
  token: null,
  error: null,
};

//User reducer which takes a state and an action param
export const getModelOutput = (state = initialState, action) => {
  //switch between action.type
  switch (action.type) {
    //if action is of type SIGN_IN or SIGN_UP return the state by setting token to the payload

    case Actions.MODEL_OUTPUT:
      return {
        ...state,
        token: action.payload,
      };
    //if action is of type SIGN_IN_ERROR or SIGN_UP_ERROR return the state by setting error to the payload

    case Actions.MODEL_OUTPUT_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    //if action is of type CLEAR_ERRORS return the state by setting error to null
    case Actions.CLEAR_MODEL_OUTPUT_ERROR:
      return {
        ...state,
        error: null,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
