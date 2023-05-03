import React, { useReducer, createContext } from "react";
import {
  getModelOutput,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/getModelOutput";

export const getModelOutputContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const CreateCategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(getModelOutput, initialState);
  const value = { state, dispatch };

  return (
    <getModelOutputContext.Provider value={value}>
      {children}
    </getModelOutputContext.Provider>
  );
};

export default CreateCategoryContextProvider;
