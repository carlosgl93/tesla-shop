import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CartList } from "../../components/cart";
import OrderSummary from "../../components/cart/OrderSummary";
import { CartContext } from "../../context";
import Loading from "../../components/ui/Loading";

const CartPage = () => {
  const { isLoaded, cart } = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  if (!isLoaded || cart.length === 0) {
    return <></>;
  }

  return (
    <ShopLayout
      title="Your Shopping Cart"
      pageDescription="Your selected items"
    >
      <Typography variant="h1" component="h1">
        Shopping Cart
      </Typography>
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <NextLink href="/checkout/address" passHref>
                  <Button color="secondary" className="circular-btn" fullWidth>
                    Checkout
                  </Button>
                </NextLink>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
