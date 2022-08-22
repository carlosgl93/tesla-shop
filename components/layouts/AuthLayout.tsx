import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC, PropsWithChildren, useContext } from "react";
import { UiContext } from "../../context";
import SnackbarAlert from "../ui/SnackbarAlert";

interface Props {
  title: string;
}

const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  const { showSnackbar, snackbarMessage, snackbarSeverity } =
    useContext(UiContext);

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='calc(100vh - 200px)'
        >
          {children}
        </Box>
        {showSnackbar && (
          <SnackbarAlert
            message={snackbarMessage}
            severity={snackbarSeverity}
          />
        )}
      </main>
    </>
  );
};

export default AuthLayout;
