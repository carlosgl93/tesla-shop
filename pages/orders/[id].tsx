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
  Chip,
} from "@mui/material";
import CartList from "../../components/cart/CartList";
import OrderSummary from "../../components/cart/OrderSummary";
import ShopLayout from "../../components/layouts/ShopLayout";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

interface Props {}

const OrderPage: FC<Props> = () => {
  return (
    <ShopLayout
      title='Order 5252 Summary'
      pageDescription='Please check if everything is correct'
    >
      <Typography variant='h1' component='h1'>
        Order 5252
      </Typography>
      {/* <Chip
        sx={{ my: 2 }}
        label='Pending Payment'
        variant='outlined'
        color='error'
        icon={<CreditCardOffOutlined />}
      /> */}
      <Chip
        sx={{ my: 2 }}
        label='Already Paid'
        variant='outlined'
        color='success'
        icon={<CreditScoreOutlined />}
      />
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
              <Typography>Carlos Gumucio </Typography>
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
                {/* todo */}
                {/* <Button color='secondary' className='circular-btn' fullWidth>
                  Pay Order
                </Button> */}
                <Chip
                  sx={{ my: 2 }}
                  label='Already Paid'
                  variant='outlined'
                  color='success'
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
