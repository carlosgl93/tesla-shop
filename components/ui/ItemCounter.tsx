import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {}

const ItemCounter: FC<Props> = () => {
  return (
    <Box display='flex' flexDirection='row'>
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center", pt: 1 }}>1</Typography>
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};

export default ItemCounter;
