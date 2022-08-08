import React, { FC, useContext } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { initialData } from "../../database/products";
import ItemCounter from "../ui/ItemCounter";
import { CartContext } from "../../context/cart/CartContext";

interface Props {
  editable?: boolean;
}

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

const CartList: FC<Props> = ({ editable = false }) => {
  const { cart } = useContext(CartContext);

  return (
    <>
      {cart.map((product) => (
        <Grid container spacing={2} sx={{ mb: 1 }} key={product.slug}>
          <Grid item xs={3} sm={3}>
            {/* todo href to productpage */}
            <NextLink href='/product/slug' passHref>
              <Link>
                <CardActionArea>
                  <CardMedia
                    image={`/products/${product.image}`}
                    component='img'
                    sx={{ borderRadius: "5px" }}
                  />
                </CardActionArea>
              </Link>
            </NextLink>
          </Grid>
          <Grid item xs={9} sm={7}>
            <Box display='flex' flexDirection='column'>
              <Typography variant='body1'>{product.title}</Typography>
              <Typography variant='body1'>
                Size: <strong>M</strong>
              </Typography>
              {editable ? (
                <></>
              ) : (
                // <ItemCounter
                //   addQuantity={}
                //   substractQuantity={}
                //   itemQuantity={}
                //   inStock={}
                //   showAlert={}
                // />
                <Typography>3 items</Typography>
              )}
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={2}
            display='flex'
            alignItems='center'
            sx={{ flexDirection: { xs: "row", sm: "column" } }}
            justifyContent='space-between'
          >
            <Typography variant='subtitle1'>{`$${product.price}`}</Typography>
            {editable && (
              <Button variant='text' color='secondary'>
                Remove
              </Button>
            )}
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default CartList;
