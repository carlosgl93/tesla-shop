import React, { FC, useReducer } from "react";
import { PropsWithChildren } from "react";
import { UiContext } from "./UiContext";
import { uiReducer } from "./UiReducer";

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

const UiProvider: FC<PropsWithChildren<UiState>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - ToggleMenu" });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export default UiProvider;
