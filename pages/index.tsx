import { Typography } from "@mui/material";
import type { NextPage } from "next";
import ShopLayout from "../components/layouts/ShopLayout";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={"Teslo Shop - Home"}
      pageDescription={"Best Teslo products here!"}
    >
      <Typography variant='h1' component='h1'>
        Home
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>
    </ShopLayout>
  );
};

export default Home;
