import React, { FC, useContext, useEffect, useState } from "react";
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
import ItemCounter from "../ui/ItemCounter";
import { CartContext } from "../../context/cart/CartContext";
import { ICartProduct } from "../../interfaces";

interface Props {
  editable?: boolean;
}

const CartList: FC<Props> = ({ editable = false }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const { cart, updateCartQuantity, removeProductFromCart } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityValue: number
  ) => {
    product.quantity = newQuantityValue;
    updateCartQuantity(product);
  };

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      {hasMounted &&
        cart.map((product) => {
          product._id = product.slug + product.size;
          return (
            <Grid
              container
              spacing={2}
              sx={{ mb: 1 }}
              key={product.slug + product.size}
            >
              <Grid item xs={3} sm={3}>
                {/* todo href to productpage */}
                <NextLink href={`/product/${product.slug}`} passHref>
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
                    Size: <strong>{product.size}</strong>
                  </Typography>
                  {editable ? (
                    <ItemCounter
                      // addQuantity={}
                      // substractQuantity={}
                      currentValue={product.quantity}
                      maxValue={product.inStock}
                      updatedQuantity={(newValue: number) =>
                        onNewCartQuantityValue(product, newValue)
                      }
                    />
                  ) : (
                    <Typography>
                      {product.quantity}{" "}
                      {product.quantity > 1 ? "items" : "item"}
                    </Typography>
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
                  <Button
                    variant='text'
                    color='secondary'
                    onClick={() => removeProductFromCart(product)}
                  >
                    Remove
                  </Button>
                )}
              </Grid>
            </Grid>
          );
        })}
    </>
  );
};

export default CartList;
