import { Box, Button } from "@mui/material";
import React, { FC, useState } from "react";
import { ISize } from "../../interfaces/products";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}

const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  const [selectSize, setSelectSize] = useState(selectedSize);

  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size='small'
          color={selectedSize === size ? "secondary" : "info"}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};

export default SizeSelector;
