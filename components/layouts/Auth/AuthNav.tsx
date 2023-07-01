import NextLink from "next/link";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";

const AuthNavbar = () => {
  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Teslo</Typography>
            <Typography variant="h6" sx={{ ml: 0.5 }}>
              Shop
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: { xs: "none", sm: "block" } }}></Box>
        <Box flex={1} />
      </Toolbar>
    </AppBar>
  );
};

export default AuthNavbar;
