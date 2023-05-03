import React, { useReducer, createContext } from "react";
import {
  Loading,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/loading";

export const LoadingContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const LoadingContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Loading, initialState);
  const value = { state, dispatch };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
