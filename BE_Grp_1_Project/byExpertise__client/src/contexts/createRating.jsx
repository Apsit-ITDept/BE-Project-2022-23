import React, { useReducer, createContext } from "react";
import {
  createRating,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/createRating";

export const ratingContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const CreateRatingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(createRating, initialState);
  const value = { state, dispatch };

  return (
    <ratingContext.Provider value={value}>{children}</ratingContext.Provider>
  );
};

export default CreateRatingContextProvider;
