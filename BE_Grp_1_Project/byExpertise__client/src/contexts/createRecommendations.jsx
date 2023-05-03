import React, { useReducer, createContext } from "react";
import {
  createRecommendation,
  initialState,
  State as InitialStateType,
  Actions,
} from "../reducers/createRecommendations";

export const RecommendationContext = createContext({
  state: initialState,
  dispatch: () => null,
});

const CreateRecommendationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(createRecommendation, initialState);
  const value = { state, dispatch };

  return (
    <RecommendationContext.Provider value={value}>
      {children}
    </RecommendationContext.Provider>
  );
};

export default CreateRecommendationsContextProvider;
