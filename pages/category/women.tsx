import { Typography } from "@mui/material";
import type { NextPage } from "next";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductList from "../../components/products/ProductList";
import useProducts from "../../hooks/useProducts";
import FullscreenLoading from "../../components/ui/FullscreenLoading";

const MenPage: NextPage = () => {
  const { products, error, isLoading } = useProducts("/products?gender=women");

  return (
    <ShopLayout
      title={"Teslo Shop - Women Products"}
      pageDescription={"Tesla Women Merchandize"}
    >
      <Typography variant="h1" component="h1">
        Women Products
      </Typography>

      {isLoading ? <FullscreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
