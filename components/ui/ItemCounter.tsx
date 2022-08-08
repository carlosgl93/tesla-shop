import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Box, Chip, IconButton, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {
  addQuantity: () => void;
  substractQuantity: () => void;
  itemQuantity: number;
  inStock: number;
  showAlert: boolean;
}

const ItemCounter: FC<Props> = ({
  addQuantity,
  substractQuantity,
  itemQuantity,
  inStock,
  showAlert,
}) => {
  return (
    <Box display='flex' flexDirection='row'>
      <IconButton onClick={() => substractQuantity()}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center", pt: 1 }}>
        {itemQuantity}
      </Typography>
      <IconButton onClick={() => addQuantity()}>
        <AddCircleOutline />
      </IconButton>
      {showAlert && (
        <Chip
          color='primary'
          label={`There is no more stock than ${inStock} items`}
        />
      )}
    </Box>
  );
};

export default ItemCounter;
