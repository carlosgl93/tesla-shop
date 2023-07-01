import { Box } from "@mui/material";
import React from "react";
import Loading from "./Loading";

const FullscreenLoading = () => {
  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 200px)"
      sx={{
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Loading />
    </Box>
  );
};

export default FullscreenLoading;
