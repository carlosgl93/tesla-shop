import React, { FC, useContext } from "react";
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
  Link,
} from "@mui/material";
import { CartList } from "../../components/cart";
import OrderSummary from "../../components/cart/OrderSummary";
import { ShopLayout } from "../../components/layouts";
import { CartContext } from "../../context";
import { countries } from "../../utils";

interface Props {}

const Summary: FC<Props> = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);

  console.log(shippingAddress);
  if (!shippingAddress) {
    return <></>;
  }
  const { firstName, lastName, address, address2, city, country, phone, zip } =
    shippingAddress;

  return (
    <ShopLayout title="Order Summary" pageDescription="order summary">
      <Typography variant="h1" component="h1">
        Order Summary {numberOfItems} {numberOfItems > 1 ? "items" : "item"}
      </Typography>
      <Grid container sx={{ mt: 2 }} spacing={2}>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography>Order Summary</Typography>
              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Delivery Address</Typography>

                <NextLink href={"/checkout/address"} passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>
                {address}
                {address2 ? `, ${address2}` : ""}
              </Typography>
              <Typography>{`${city}, ${zip} - ${
                countries.find((c) => c.code === country)?.name
              } `}</Typography>
              <Typography>{phone}</Typography>

              <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
                <Typography variant="subtitle1">Order Details</Typography>
                <NextLink href={"/cart"} passHref>
                  <Link underline="always">Edit</Link>
                </NextLink>
              </Box>
              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
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
