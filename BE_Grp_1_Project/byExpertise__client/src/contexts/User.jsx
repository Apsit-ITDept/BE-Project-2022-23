import React, { useReducer, createContext } from "react";
import {
  User,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/user";

export const UserContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(User, initialState);
  const value = { state, dispatch };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
