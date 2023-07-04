import { Typography } from "@mui/material";
import type { NextPage } from "next";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import useProducts from "../hooks/useProducts";
import FullscreenLoading from "../components/ui/FullscreenLoading";

const Home: NextPage = () => {
  const { products, error, isLoading } = useProducts("/products");

  return (
    <ShopLayout
      title={"Teslo Shop - Home"}
      pageDescription={"Best Teslo products here!"}
    >
      <Typography variant="h1" component="h1">
        Home
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        All Products
      </Typography>

      {isLoading ? <FullscreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default Home;
