import React, { useContext, useState } from "react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Chip,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorOutline } from "@mui/icons-material";

import AuthLayout from "../../components/layouts/AuthLayout";
import { teslaApi } from "../../api";
import { validations } from "../../utils";
import { useRouter } from "next/router";
import { AuthContext } from "../../context";

type FormData = {
  email: string;
  password: string;
  name: string;
};

const Signup = () => {
  const router = useRouter();
  const { registerUser } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onRegisterUser = async ({ email, password, name }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser(email, password, name);

    if (hasError) {
      setShowError(true);
      setErrorMessage(message!);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    await signIn("credentials", {
      email,
      password,
    });
  };

  const onInvalid = () => {
    console.log("invalid form", errors);
  };
  return (
    <AuthLayout title="Register your account - Teslo Shop">
      <form onSubmit={handleSubmit(onRegisterUser, onInvalid)}>
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
                Register Account
              </Typography>

              <Chip
                label={`error message`}
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
                label="Name"
                variant="filled"
                fullWidth
                type="text"
                {...register("name", {
                  required: "Please enter your name",
                  minLength: 2,
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="filled"
                fullWidth
                type="email"
                {...register("email", {
                  required: "Please enter your email",
                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                fullWidth
                type="password"
                {...register("password", {
                  required: "Password must be at least 6 characters long",
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                color="secondary"
                className="circular-btn"
                size="large"
                fullWidth
                disabled={showError}
                type="submit"
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="end">
              <NextLink
                href={`/auth/login?p=${
                  router.query.p?.toString() || "/auth/login"
                }`}
                passHref
              >
                <Link underline="always">Already have an account?</Link>
              </NextLink>
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

export default Signup;
