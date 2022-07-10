import React, { FC, useMemo, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";

import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const productImage = useMemo(() => {
    return isHovered
      ? `products/${product.images[1]}`
      : `products/${product.images[0]}`;
  }, [isHovered, product.images]);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <CardActionArea>
          <CardMedia
            className='fadeIn'
            alt={product.title}
            component='img'
            image={productImage}
          />
        </CardActionArea>
      </Card>
      <Box sx={{ mt: 1 }} className='fadeIn'>
        <Typography fontWeight={700}>{product.title}</Typography>
        <Typography fontWeight={500}>{`$${product.price}`}</Typography>
      </Box>
    </Grid>
  );
};

export default ProductCard;
