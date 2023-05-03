// import the types of actions supported
import { START_LOADING, STOP_LOADING } from "../actions/Types";

// Actions type to accept either START_LOADING or STOP_LOADING type

// LoadingInterface to define the State type for the state of the reducer
const LoadingInterface = {
  loading: false,
};

// State type for defining the state of the reducer
const State = LoadingInterface;

// Initial state of the reducer of type State
export const initialState = {
  ...LoadingInterface,
};

// Loading reducer which takes a state and an action param
export const Loading = (state = initialState, action) => {
  // switch between action.type
  switch (action.type) {
    // if action is of type START_LOADING return the state by setting loading to true
    case START_LOADING:
      return {
        ...state,
        loading: true,
      };
    // if action is of type STOP_LOADING return the state by setting loading to false
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      };
    // return state as it is if action is not of any of the aforementioned types
    default:
      return state;
  }
};
