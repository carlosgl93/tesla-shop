import { Divider, Grid, Typography } from "@mui/material";
import React, { FC, useContext } from "react";
import { CartContext } from "../../context";
import { currency } from "../../utils";

interface Props {}

export const OrderSummary: FC<Props> = () => {
  const { numberOfItems, subTotal, tax, total } = useContext(CartContext);

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography># of products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{numberOfItems}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Sub total</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(subTotal)}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>
      <Grid item xs={12} sx={{ my: 2 }}>
        <Divider />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1">Total</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="subtitle1" display="flex" justifyContent="end">
          {currency.format(total)}
        </Typography>
      </Grid>
    </Grid>
  );
};
