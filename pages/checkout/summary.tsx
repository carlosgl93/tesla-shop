import React, { FC } from "react";
import NextLink from "next/link";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Link,
} from "@mui/material";
import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/cart/OrderSummary";
import ShopLayout from "../../components/layouts/ShopLayout";

interface Props {}

const Summary: FC<Props> = () => {
  return (
    <ShopLayout title='Your Order Summary' pageDescription='Your order summary'>
      <Typography variant='h1' component='h1'>
        Order Summary
      </Typography>
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className='summary-card'>
            <CardContent>
              <Typography>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />

              <Box display='flex' justifyContent='space-between'>
                <Typography variant='subtitle1'>Delivery Address</Typography>

                <NextLink href={"/checkout/address"} passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <Typography>Carlos Gumucio</Typography>
              <Typography>Copihue 2884</Typography>
              <Typography>Stgo, Chile</Typography>

              <Box display='flex' justifyContent='space-between' sx={{ mt: 1 }}>
                <Typography variant='subtitle1'>Order Details</Typography>
                <NextLink href={"/cart"} passHref>
                  <Link underline='always'>Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color='secondary' className='circular-btn' fullWidth>
                  Confirm Order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default Summary;
