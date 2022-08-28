import React, { useContext, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import AuthLayout from "../../components/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { validations } from "../../utils";

import { AuthContext, UiContext } from "../../context";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const { userLogin } = useContext(AuthContext);

  const onLoginUser = async ({ email, password }: FormData) => {
    const isValidLogin = await userLogin(email, password);

    if (isValidLogin) {
      router.replace("/");
    }

    // todo: go to the page the user was before logging
  };

  return (
    <AuthLayout title='Sign in to Teslo Shop'>
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Login to your account
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='email'
                label='Email'
                variant='filled'
                fullWidth
                {...register("email", {
                  required: "This field is required",

                  validate: validations.isEmail,
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Password'
                type='password'
                variant='filled'
                fullWidth
                {...register("password", {
                  required: "This field is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters of longer",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type='submit'
                color='secondary'
                className='circular-btn'
                size='large'
                fullWidth
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/signup' passHref>
                <Link underline='always'>Dont have an account yet?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
      {/* <SnackbarAlert message={snackbarMessage} severity={snackbarSeverity} /> */}
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar> */}
    </AuthLayout>
  );
};

export default Login;
