import { AlertColor } from "@mui/material";
import React, { FC, useReducer } from "react";
import { PropsWithChildren } from "react";
import { UiContext } from "./UiContext";
import { uiReducer } from "./UiReducer";

export interface UiState {
  isMenuOpen: boolean;
  showSnackbar: boolean;
  snackbarMessage: string;
  snackbarSeverity: AlertColor;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
  showSnackbar: false,
  snackbarMessage: "",
  snackbarSeverity: "info",
};

const UiProvider: FC<PropsWithChildren<UiState>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleSideMenu = () => {
    dispatch({ type: "[UI] - Toggle Menu" });
  };

  const toggleSnackbar = (
    message: string = "",
    severity: AlertColor = "info"
  ) => {
    dispatch({
      type: "[UI] - Toggle Snackbar",
      payload: {
        message,
        severity,
      },
    });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,

        // Methods
        toggleSideMenu,
        toggleSnackbar,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};

export default UiProvider;
