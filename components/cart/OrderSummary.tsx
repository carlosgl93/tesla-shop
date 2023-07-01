import { Divider, Grid, Typography } from "@mui/material";
import React, { FC } from "react";

interface Props {}

const OrderSummary: FC<Props> = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography># of products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3 items</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Sub Total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${155.36}`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Taxes (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{`$${35.34}`}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ my: 2 }}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          variant="subtitle1"
          display="flex"
          justifyContent="end"
        >{`$${185.34}`}</Typography>
      </Grid>
    </Grid>
  );
};

export default OrderSummary;
