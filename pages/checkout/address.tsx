import { useContext } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

import { useForm } from "react-hook-form";
import Cookie from "js-cookie";

import { countries } from "../../utils";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { AuthContext, CartContext } from "../../context";

type FormData = {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
};

const getAddressFromCookie = (): FormData => {
  return {
    firstName: Cookie.get("firstName") || "",
    lastName: Cookie.get("lastName") || "",
    address: Cookie.get("address") || "",
    address2: Cookie.get("address2") || "",
    zip: Cookie.get("zip") || "",
    city: Cookie.get("city") || "",
    country: Cookie.get("country") || "",
    phone: Cookie.get("phone") || "",
  };
};

const Address = () => {
  const router = useRouter();
  const { updateAddress } = useContext(CartContext);

  // const { user } = useContext(AuthContext);

  // if (!user)
  //   router.push({
  //     pathname: "/auth/login",
  //     query: { p: "/checkout/address" },
  //   });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: getAddressFromCookie(),
  });

  const onSubmit = (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout title="Your Address" pageDescription="Confirm delivery address">
      <Typography variant="h1" component="h1">
        Delivery Address
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Firstname"
              variant="filled"
              fullWidth
              {...register("firstName", {
                required: "Please enter your name",
                minLength: 3,
              })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Lastname"
              variant="filled"
              fullWidth
              {...register("lastName", {
                required: "Please enter your last name",
                minLength: 3,
              })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address"
              variant="filled"
              fullWidth
              {...register("address", {
                required: "Please enter your address",
                minLength: 3,
              })}
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2 (Optional)"
              variant="filled"
              fullWidth
              {...register("address2")}
              error={!!errors.address2}
              helperText={errors.address2?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postal Code"
              variant="filled"
              fullWidth
              {...register("zip", {
                required: "Please enter your zip code",
                minLength: 3,
              })}
              error={!!errors.zip}
              helperText={errors.zip?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="City"
              variant="filled"
              fullWidth
              {...register("city", {
                required: "Please enter your city",
                minLength: 3,
              })}
              error={!!errors.city}
              helperText={errors.city?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                variant="filled"
                label="Country"
                defaultValue={Cookie.get("country") || "CHL"}
                {...register("country", {
                  required: "Please select your country",
                })}
                error={!!errors.country}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              variant="filled"
              fullWidth
              {...register("phone", {
                required: "Please enter your phone",
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
            />
          </Grid>
        </Grid>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          sx={{ mt: 5 }}
        >
          <Button
            type="submit"
            color="secondary"
            className="circular-btn"
            size="large"
          >
            Review Order
          </Button>
        </Box>
      </form>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log(session, "session");

  if (!session)
    return {
      redirect: {
        destination: "/auth/login?p=/checkout/address",
        permanent: false,
      },
    };

  return {
    props: {},
  };
};

export default Address;
