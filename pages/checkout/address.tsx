import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import ShopLayout from "../../components/layouts/ShopLayout";

const Address = () => {
  return (
    <ShopLayout title='Your Address' pageDescription='Confirm delivery address'>
      <Typography variant='h1' component='h1'>
        Delivery Address
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label='Name' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Lastname' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Address' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Address 2 (Optional)' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Postal Code' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='City' variant='filled' fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select variant='filled' label='Country' value={1}>
              <MenuItem value={1}>Chile</MenuItem>
              <MenuItem value={2}>Argentina</MenuItem>
              <MenuItem value={3}>Peru</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label='Phone' variant='filled' fullWidth />
        </Grid>
      </Grid>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='center'
        sx={{ mt: 5 }}
      >
        <Button
          color='secondary'
          className='circular-btn'
          size='large'
          fullWidth
        >
          Review Order
        </Button>
      </Box>
    </ShopLayout>
  );
};

export default Address;
