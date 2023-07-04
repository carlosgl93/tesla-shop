import { Box, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { IProduct } from "../../interfaces";
import ProductCard from "./ProductCard";

interface Props {
  products: IProduct[];
}

export const ProductList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            width: "100vw",
          }}
        >
          <Typography variant="h1">No products found</Typography>
        </Box>
      )}
    </Grid>
  );
};
