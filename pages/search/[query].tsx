import type { NextPage, GetServerSideProps } from "next";
import { Typography } from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductList from "../../components/products/ProductList";
import { dbProducts } from "../../database";
import { IProduct } from "../../interfaces";

interface Props {
  products: IProduct[];
  searchTerm: string;
  foundProducts: boolean;
}

const Search: NextPage<Props> = ({ products, searchTerm, foundProducts }) => {
  return (
    <ShopLayout
      title={"Tesla Shop - Search Results"}
      pageDescription={"Best Tesla products here!"}
    >
      <Typography variant="h1" component="h1">
        Search Products
      </Typography>

      {foundProducts ? (
        <>
          <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>
            Products found for {searchTerm}
          </Typography>
          <ProductList products={products} />
        </>
      ) : (
        <>
          <Typography variant="h2" sx={{ mt: 1, mb: 3 }}>
            No products found for {searchTerm}. Check these ones out!
          </Typography>
          <ProductList products={products} />
        </>
      )}
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  // if there are no matches, TODO return other products
  if (!foundProducts) {
    products = await dbProducts.getProductsIfNotFound();
    return {
      props: {
        products,
        searchTerm: query,
        foundProducts,
      },
    };
  }
  return {
    props: {
      products,
      searchTerm: query,
      foundProducts,
    },
  };
};

export default Search;
