import { UiState } from "./";

type UiActionType =
  | {
      type: "[UI] - Toggle Menu";
    }
  | {
      type: "[UI] - Toggle Snackbar";
      payload: { message?: string; severity?: string };
    };

export const uiReducer = (state: UiState, action: UiActionType): UiState => {
  switch (action.type) {
    case "[UI] - Toggle Menu":
      return { ...state, isMenuOpen: !state.isMenuOpen };

    case "[UI] - Toggle Snackbar":
      return { ...state, showSnackbar: !state.showSnackbar };

    default:
      return state;
  }
};
