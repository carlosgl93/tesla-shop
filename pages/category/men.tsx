import type { NextPage } from "next";

import { Typography } from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductList from "../../components/products/ProductList";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import { useProducts } from "../../hooks";
// import { initialData } from "../database/products";

const Men: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title={"Teslo Shop - Men Clothes"}
      pageDescription={"Browse men clothing"}
    >
      <Typography variant='h1' component='h1'>
        Men
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        Products for him
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

export default Men;
