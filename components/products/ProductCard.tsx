import { Grid, Card, CardActionArea, CardMedia } from "@mui/material";
import React, { FC } from "react";
import { IProduct } from "../../interfaces";

interface Props {
  product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Grid item key={product.slug} xs={6} sm={4}>
      <Card>
        <CardActionArea>
          <CardMedia
            alt={product.title}
            component='img'
            image={`products/${product.images[0]}`}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ProductCard;
