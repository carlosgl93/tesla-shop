import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import React from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/cart/OrderSummary";

const CartPage = () => {
  return (
    <ShopLayout
      title='Your Shopping Cart'
      pageDescription='Your selected items'
    >
      <Typography variant='h1' component='h1'>
        Shopping Cart
      </Typography>
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
