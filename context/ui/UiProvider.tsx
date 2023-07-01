import React, { FC, useReducer } from "react";
import { uiReducer } from "./";
import { UiContext } from "./";

type ProviderProps = {
  children: React.ReactNode;
};

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

export const UiProvider: FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => dispatch({ type: "UI - Toggle Sidebar" });

  return (
    <UiContext.Provider
      value={{
        ...state,
        // methods
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
