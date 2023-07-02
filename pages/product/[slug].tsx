import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductSlideShow from "../../components/products/ProductSlideShow";
import SizeSelector from "../../components/products/SizeSelector";
import ItemCounter from "../../components/ui/ItemCounter";
import { IProduct } from "../../interfaces";
import {
  GetServerSideProps,
  GetStaticPaths,
  NextPage,
  GetStaticProps,
} from "next";

import { dbProducts } from "../../database";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display="flex" flexDirection="column">
            <Typography variant="h1" component="h1">
              {product.title}
            </Typography>
            <Typography variant="subtitle1" component="h2">
              ${`${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2" component="h6">
                Quantity
              </Typography>
              <ItemCounter />
              <SizeSelector
                selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {product.inStock <= 0 ? (
              <Chip
                label="There is no items available"
                color="error"
                variant="outlined"
              />
            ) : (
              <Button color="secondary" className="circular-btn">
                Add to Cart
              </Button>
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Description</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProducts.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await dbProducts.getAllProductsSlugs();

  return {
    paths: slugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

export default ProductPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};
