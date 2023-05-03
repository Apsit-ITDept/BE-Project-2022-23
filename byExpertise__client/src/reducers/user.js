//import the types of actions supported
import {
  SIGN_IN,
  SIGN_UP,
  SIGN_IN_ERROR,
  SIGN_UP_ERROR,
  CLEAR_ERRORS,
  LOGOUT,
} from "../actions/Types";

//Actions type to accept either SIGN_IN, SIGN_UP, SIGN_IN_ERROR or SIGN_UP_ERROR types with a payload
//or CLEAR_ERRORS or LOGOUT types without a payload
export const Actions = {
  SIGN_IN: SIGN_IN,
  SIGN_UP: SIGN_UP,
  SIGN_IN_ERROR: SIGN_IN_ERROR,
  SIGN_UP_ERROR: SIGN_UP_ERROR,
  CLEAR_ERRORS: CLEAR_ERRORS,
  LOGOUT: LOGOUT,
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
export const User = (state = initialState, action) => {
  //switch between action.type
  switch (action.type) {
    //if action is of type SIGN_IN or SIGN_UP return the state by setting token to the payload
    case Actions.SIGN_IN:
    case Actions.SIGN_UP:
      return {
        ...state,
        token: action.payload,
      };
    //if action is of type SIGN_IN_ERROR or SIGN_UP_ERROR return the state by setting error to the payload
    case Actions.SIGN_IN_ERROR:
    case Actions.SIGN_UP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    //if action is of type LOGOUT return the state by setting error and token to null
    case Actions.LOGOUT:
      return {
        ...state,
        token: null,
        error: null,
      };
    //if action is of type CLEAR_ERRORS return the state by setting error to null
    case Actions.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    //return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
