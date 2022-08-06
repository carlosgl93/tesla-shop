import { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductSlideShow from "../../components/products/ProductSlideShow";
import SizeSelector from "../../components/products/SizeSelector";
import ItemCounter from "../../components/ui/ItemCounter";
import { IProduct } from "../../interfaces";
import { dbProducts } from "../../database";

// const product = initialData.products[0];

interface Props {
  product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display='flex' flexDirection='column'>
            <Typography variant='h1' component='h1'>
              {product.title}
            </Typography>
            <Typography variant='subtitle1' component='h2'>
              ${`${product.price}`}
            </Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2' component='h6'>
                Quantity
              </Typography>
              <ItemCounter />
              <SizeSelector
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
              />
            </Box>

            {product.inStock <= 0 ? (
              <Chip
                label='There is no items available'
                color='error'
                variant='outlined'
              />
            ) : (
              <Button color='secondary' className='circular-btn'>
                Add to Cart
              </Button>
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant='subtitle2'>Description</Typography>
              <Typography variant='body2'>{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// import { GetServerSideProps } from "next";
// import { dbProducts } from "../../database";

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug } = params as { slug: string };

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

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
  // aqui lo que hago es obtener de la db todos los slugs de los products
  // luego debemos retonar un [] con objectos que tengan key params y
  // params debe ser un objecto con las props que yo quiera pasarle al componente

  const productSlugs = await dbProducts.getAllProductSlugs();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: {
        slug,
      },
    })),
    fallback: "blocking",
  };
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Aqui dado que arriba genere en buildtime los paths a todos los productos
  // a traves de las props obtengo el slug, por lo que ahora puedo consultar la db
  // obtengo el producto desde la db y ya estara staticamente cargado el producto.
  // en caso de que el producto no se encuentre, se redirecciona
  // tambn se revalidaran los static props/paths cada 24 horas

  const { slug = "" } = params as { slug: string };

  const product = await dbProducts.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24,
  };
};

export default ProductPage;
