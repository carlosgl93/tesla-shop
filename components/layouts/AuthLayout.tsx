import { Box } from "@mui/material";
import Head from "next/head";
import React, { FC, PropsWithChildren } from "react";
import AuthNavbar from "./Auth/AuthNav";

interface Props {
  title: string;
}

const AuthLayout: FC<PropsWithChildren<Props>> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <AuthNavbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="calc(100vh - 200px)"
          sx={{
            pt: 10,
          }}
        >
          {children}
        </Box>
      </main>
    </>
  );
};

export default AuthLayout;
