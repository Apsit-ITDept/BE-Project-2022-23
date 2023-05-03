import React, { useReducer, createContext } from "react";
import {
  createCategory,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/createCategory";

export const categoryContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const CreateCategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(createCategory, initialState);
  const value = { state, dispatch };

  return (
    <categoryContext.Provider value={value}>
      {children}
    </categoryContext.Provider>
  );
};

export default CreateCategoryContextProvider;
