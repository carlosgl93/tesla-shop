import React from "react";
import NextLink from "next/link";
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";

import AuthLayout from "../../components/layouts/AuthLayout";

const Login = () => {
  return (
    <AuthLayout title='Sign in to Teslo Shop'>
      <Box sx={{ width: 350, padding: "10px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h1' component='h1'>
              Login to your account
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField label='Email' variant='filled' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label='Password'
              type='password'
              variant='filled'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
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
              <Link underline='always'>Don't have an account yet?</Link>
            </NextLink>
          </Grid>
        </Grid>
      </Box>
    </AuthLayout>
  );
};

export default Login;
