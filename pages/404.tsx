import { Box, Typography } from "@mui/material";
import React from "react";
import { ShopLayout } from "../components/layouts";

const NotFound = () => {
  return (
    <ShopLayout
      title="Page not found: 404"
      pageDescription="No page with this url is available."
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Typography variant="h1" component="h1" fontSize="80" fontWeight={200}>
          404 |
        </Typography>
        <Typography marginLeft={2}>
          No page with this url is available.
        </Typography>
      </Box>
    </ShopLayout>
  );
};

export default NotFound;
