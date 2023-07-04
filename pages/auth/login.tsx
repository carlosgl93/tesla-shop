import React, { useEffect, useState } from "react";
import { signIn, getSession, getProviders } from "next-auth/react";
import { GetServerSideProps } from "next";

import NextLink from "next/link";
import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import AuthLayout from "../../components/layouts/AuthLayout";
import { isValidEmail } from "../../utils/validations";
import { ErrorOutline } from "@mui/icons-material";
import { AuthContext } from "../../context";
import { useRouter } from "next/router";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [providers, setProviders] = useState<any>({});

  useEffect(() => {
    getProviders().then((prov) => {
      setProviders(prov);
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showError, setShowError] = useState(false);

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 3000);
    //   return;
    // }

    // const destination = router.query.p?.toString() || "/";
    // router.push(destination);

    signIn("credentials", {
      email,
      password,
    });
  };

  return (
    <AuthLayout title="Sign in to Teslo Shop">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 5,
                  textAlign: "center",
                }}
              >
                Login to your account
              </Typography>

              <Chip
                label="Email or password not recognized"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{
                  display: showError ? "flex" : "none",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                variant="filled"
                fullWidth
                {...register("email", {
                  required: "This field is required",
                  validate: (val) => isValidEmail(val),
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                variant="filled"
                fullWidth
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={showError}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={`/auth/signup?p=${
                  router.query.p?.toString() || "/auth/signup"
                }`}
                passHref
              >
                <Link underline="always">Dont have an account yet?</Link>
              </NextLink>
            </Grid>

            <Grid
              item
              xs={12}
              display="flex"
              flexDirection="column"
              justifyContent="end"
            >
              <Divider
                sx={{
                  width: "100%",
                  mb: 2,
                }}
              />

              {Object.values(providers).map((provider: any) => {
                if (provider.id === "credentials") return null;
                return (
                  <Button
                    key={provider.name}
                    variant="outlined"
                    color="secondary"
                    size="large"
                    fullWidth
                    onClick={() => signIn(provider.id)}
                    sx={{
                      mb: 1,
                    }}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
