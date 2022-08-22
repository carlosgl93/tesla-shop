import { FC, useContext, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";
import ProductSlideShow from "../../components/products/ProductSlideShow";
import SizeSelector from "../../components/products/SizeSelector";
import ItemCounter from "../../components/ui/ItemCounter";
import { ICartProduct, IProduct, ISize } from "../../interfaces";
import { dbProducts } from "../../database";
import { CartContext } from "../../context";
import { GifBox } from "@mui/icons-material";

interface Props {
  product: IProduct;
}

const ProductPage: FC<Props> = ({ product }) => {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);

  const { addProductToCart, cart } = useContext(CartContext);

  const [showSuggestion, setShowSuggestion] = useState(false);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
    inStock: product.inStock,
  });

  const selectSize = (size: ISize) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      size,
    }));
  };

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct((currentProduct) => ({
      ...currentProduct,
      quantity,
    }));
  };

  const addQuantity = () => {
    if (tempCartProduct.quantity < tempCartProduct.inStock) {
      setTempCartProduct((currentProduct) => ({
        ...currentProduct,
        quantity: currentProduct.quantity + 1,
      }));
    } else if (tempCartProduct.quantity === tempCartProduct.inStock) {
      setShowAlert(true);
    }
  };

  const substractQuantity = () => {
    setShowAlert(false);
    if (tempCartProduct.quantity > 1) {
      setTempCartProduct((currentProduct) => ({
        ...currentProduct,
        quantity: currentProduct.quantity - 1,
      }));
    } else return;
  };

  const onAddProduct = () => {
    if (!tempCartProduct.size) {
      return;
    } else {
      addProductToCart(tempCartProduct);
      setShowSuggestion(true);
    }

    // todo call the context action to add to cart
  };

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
              <ItemCounter
                currentValue={tempCartProduct.quantity}
                updatedQuantity={onUpdateQuantity}
                maxValue={product.inStock}
              />
              <SizeSelector
                // selectedSize={product.sizes[0]}
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={(size) => selectSize(size)}
              />
            </Box>

            {product.inStock <= 0 ? (
              <Chip
                label='There is no items available'
                color='error'
                variant='outlined'
              />
            ) : (
              <Button
                color='secondary'
                className='circular-btn'
                onClick={() => onAddProduct()}
              >
                {tempCartProduct.size ? "Add to Cart" : "Select a size"}
              </Button>
            )}

            {showSuggestion && (
              <Box
                sx={{
                  mt: "2vh",
                }}
                display='flex'
                justifyContent='space-around'
              >
                <Button onClick={() => router.push("/cart")}>
                  Review my shopping cart
                </Button>

                <Button onClick={() => router.push("/checkout/summary")}>
                  Go to checkout
                </Button>
              </Box>
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
