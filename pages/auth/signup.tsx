import React, { useContext, useState } from "react";
import NextLink from "next/link";
import {
  AlertColor,
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import AuthLayout from "../../components/layouts/AuthLayout";
import { useForm } from "react-hook-form";
import { tesloApi } from "../../api";
import { validations } from "../../utils";
import { UiContext } from "../../context";

type FormData = {
  name: string;
  email: string;
  password: string;
  lastname: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { toggleSnackbar } = useContext(UiContext);

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setsnackbarSeverity] = useState<AlertColor>("info");

  const onRegisterUser = async ({
    email,
    password,
    name,
    lastname,
  }: FormData) => {
    setOpen(false);
    try {
      const { data } = await tesloApi.post("/user/register", {
        email,
        password,
        name,
      });

      const { token, user } = data;
      console.log({ token, user });
    } catch (error) {
      toggleSnackbar("Error creating your account", "error");
      setOpen(true);
      setSnackbarMessage("Verify the information typed.");
      setsnackbarSeverity("error");
      console.log(error);
    }

    // todo: go to the page the user was before logging
  };

  return (
    <AuthLayout title='Sign in to Teslo Shop'>
      <form onSubmit={handleSubmit(onRegisterUser)} noValidate>
        <Box sx={{ width: 350, padding: "10px 20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant='h1' component='h1'>
                Create your account!
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Name'
                variant='filled'
                fullWidth
                {...register("name", {
                  required: "This field is required",
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label='Lastname'
                variant='filled'
                fullWidth
                {...register("lastname", {
                  required: "This field is required",
                })}
                error={!!errors.lastname}
                helperText={errors.lastname?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
                Register
              </Button>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent='end'>
              <NextLink href='/auth/login' passHref>
                <Link underline='always'>Already have an account?</Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </form>
    </AuthLayout>
  );
};

export default Signup;
