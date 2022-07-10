import {
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import type { NextPage } from "next";
import ShopLayout from "../components/layouts/ShopLayout";
import { initialData } from "../database/products";

const Home: NextPage = () => {
  return (
    <ShopLayout
      title={"Teslo Shop - Home"}
      pageDescription={"Best Teslo products here!"}
    >
      <Typography variant='h1' component='h1'>
        Home
      </Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>
        All Products
      </Typography>
      <Grid container spacing={4}>
        {initialData.products.map((product) => {
          return (
            <Grid item key={product.slug} xs={6} sm={4}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    alt={product.title}
                    component='img'
                    image={`products/${product.images[0]}`}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </ShopLayout>
  );
};

export default Home;
