import { Typography } from "@mui/material";
import type { NextPage } from "next";
import useProducts from "../../hooks/useProducts";
import { ShopLayout } from "../../components/layouts/ShopLayout";
import { ProductList } from "../../components/products";
import FullscreenLoading from "../../components/ui/FullscreenLoading";

const MenPage: NextPage = () => {
  const { products, error, isLoading } = useProducts("/products?gender=kid");

  return (
    <ShopLayout
      title={"Teslo Shop - Children Products"}
      pageDescription={"Tesla Children Merchandize"}
    >
      <Typography variant="h1" component="h1">
        Children Products
      </Typography>

      {isLoading ? <FullscreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
