import React, { FC, useContext, useState } from "react";

import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";

interface Props {
  currentValue: number;
  maxValue: number;
  updatedQuantity: (newValue: number) => void;
}

const ItemCounter: FC<Props> = ({
  currentValue,
  maxValue,
  updatedQuantity,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return;
      setShowAlert(false);
      return updatedQuantity(currentValue - 1);
    }
    if (currentValue >= maxValue) {
      setShowAlert(true);
      return;
    }

    updatedQuantity(currentValue + 1);
  };

  return (
    <Box display='flex' flexDirection='row'>
      <IconButton onClick={() => addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center", pt: 1 }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
      {showAlert && (
        <Chip
          color='primary'
          label={`There is no more stock than ${maxValue} items`}
        />
      )}
    </Box>
  );
};

export default ItemCounter;
