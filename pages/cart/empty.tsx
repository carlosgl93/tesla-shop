import NextLink from "next/link";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import React, { FC } from "react";
import ShopLayout from "../../components/layouts/ShopLayout";

interface Props {}

const Empty: FC<Props> = () => {
  return (
    <ShopLayout
      title='Empty Cart'
      pageDescription='There is no articles in the shopping cart'
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='calc(100vh - 200px)'
        sx={{
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />

        <Box display='flex' flexDirection='column' alignItems='center'>
          <Typography marginLeft={2}>Your shopping cart is empty</Typography>
          <NextLink href='/' passHref>
            <Link typography='h4' color='seconday'>
              Go back
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default Empty;
