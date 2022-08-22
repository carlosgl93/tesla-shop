import { AlertColor } from "@mui/material";
import { createContext } from "react";

interface ContextProps {
  isMenuOpen: boolean;
  showSnackbar: boolean;
  snackbarMessage: string;
  snackbarSeverity: AlertColor;

  //   Methods
  toggleSideMenu: () => void;
  toggleSnackbar: (message?: string, severity?: AlertColor) => void;
}
export const UiContext = createContext({} as ContextProps);
