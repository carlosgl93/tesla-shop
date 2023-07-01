import { Typography } from "@mui/material";
import type { NextPage } from "next";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductList from "../../components/products/ProductList";
import useProducts from "../../hooks/useProducts";
import FullscreenLoading from "../../components/ui/FullscreenLoading";

const MenPage: NextPage = () => {
  const { products, error, isLoading } = useProducts("/products?gender=men");

  return (
    <ShopLayout
      title={"Teslo Shop - Men Products"}
      pageDescription={"Tesla Men Merchandize"}
    >
      <Typography variant="h1" component="h1">
        Men Products
      </Typography>

      {isLoading ? <FullscreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
