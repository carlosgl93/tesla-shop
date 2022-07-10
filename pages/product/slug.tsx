import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductSlideShow from "../../components/products/ProductSlideShow";
import { initialData } from "../../database/products";

const product = initialData.products[0];

const ProductPage = () => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container>
        <Grid item xs={12} sm={7}>
          {/* SLIDE SHOW */}
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${`${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' component='h6'>
                Quantity
              </Typography>
              {/* Item counter todo */}
            </Box>

            {product.inStock <= 0 ? (
              <Chip
                label='There is no items available'
                color='error'
                variant='outlined'
              />
            ) : (
              <Button color='secondary' className='circular-btn'>
                Add to Cart
              </Button>
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default ProductPage;