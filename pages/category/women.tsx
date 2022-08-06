import type { NextPage } from "next";
import { Typography } from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductList from "../../components/products/ProductList";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import { useProducts } from "../../hooks";
// import { initialData } from "../database/products";

const Home: NextPage = () => {
  const { products, isLoading, isError } = useProducts(
    "/products?gender=women"
  );

  return (
    <ShopLayout
      title={"Teslo Shop - Home"}
      pageDescription={"Best Teslo products here!"}
    >
      <Typography variant='h1' component='h1'>
        Women Clothes
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Products for her
      </Typography>
      {isLoading ? (
        <FullScreenLoading />
      ) : isError ? (
        <Typography>
          THERE WAS AN ERROR FETCHING THE INITIAL PRODUCTS {`${isError}`}
        </Typography>
      ) : (
        <ProductList products={products} />
      )}
    </ShopLayout>
  );
};

export default Home;
