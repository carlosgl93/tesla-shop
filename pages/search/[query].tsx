import { Typography, CircularProgress, Box } from "@mui/material";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import ShopLayout from "../../components/layouts/ShopLayout";
import ProductList from "../../components/products/ProductList";
import FullScreenLoading from "../../components/ui/FullScreenLoading";
import { dbProducts } from "../../database";
import { useProducts } from "../../hooks";
import { IProduct } from "../../interfaces";
// import { initialData } from "../database/products";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const Search: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title={"Teslo Shop - Search"}
      pageDescription={"Best Teslo products here!"}
    >
      <Typography variant='h1' component='h1'>
        Search
      </Typography>
      {foundProducts ? (
        <Typography variant='h2' sx={{ mb: 1 }} textTransform='capitalize'>
          Found products by: {query}
        </Typography>
      ) : (
        <Box display='flex'>
          <Typography sx={{ mt: 1 }} variant='h2'>
            There were no products found by this search term:{" "}
          </Typography>

          <Typography
            sx={{ mt: 1 }}
            variant='h2'
            color='secondary'
            textTransform='capitalize'
          >
            {query}
          </Typography>
        </Box>
      )}

      <ProductList products={products} />
      {/* {isLoading ? (
        <FullScreenLoading />
      ) : isError ? (
        <Typography>
          THERE WAS AN ERROR FETCHING THE INITIAL PRODUCTS {`${isError}`}
        </Typography>
      ) : (
        
      )} */}
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: true,
      },
    };
  }
  // definimos con let ya que si no se encuentran productos bajo el termino
  // buscado, podemos sugerirle otros productos.
  let products = await dbProducts.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProducts.getProductsByTerm("shirt");
  }

  // todo: retornar otros productos

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default Search;
