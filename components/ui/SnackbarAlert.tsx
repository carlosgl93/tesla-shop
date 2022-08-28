// React & dependencies
import { FC, useContext } from "react";

// Material Components
import { Alert, AlertColor, Snackbar } from "@mui/material";

// My components
import { UiContext } from "../../context";

// Queries & Mutations

// Typescript
interface Props {
  message: string;
  severity: AlertColor;
}
const SnackbarAlert: FC<Props> = ({ message, severity }) => {
  const { showSnackbar, toggleSnackbar } = useContext(UiContext);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    toggleSnackbar();
  };

  return (
    <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
export default SnackbarAlert;
