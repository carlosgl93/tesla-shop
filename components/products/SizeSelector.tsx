import { Box, Button } from "@mui/material";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { ICartProduct } from "../../interfaces";
import { ISize } from "../../interfaces/products";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
  onSelectedSize: (size: ISize) => void;
}

const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  // const [selectSize, setSelectSize] = useState(selectedSize);

  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size='small'
          color={selectedSize === size ? "primary" : "info"}
          onClick={() => {
            onSelectedSize(size);
          }}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
