import NextLink from "next/link";
import { useRouter } from "next/router";
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
import { UiContext } from "../../context";
import { useContext } from "react";

const Navbar = () => {
  const { asPath } = useRouter();

  const { toggleSideMenu } = useContext(UiContext);

  return (
    <AppBar>
      <Toolbar>
        <NextLink href='/' passHref>
          <Link display='flex' alignItems='center'>
            <Typography variant='h6'>Teslo</Typography>
            <Typography variant='h6' sx={{ ml: 0.5 }}>
              Shop
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <NextLink href='/category/men'>
            <Link>
              <Button
                style={{
                  backgroundColor:
                    asPath === "/category/men" ? "black" : "white",
                  color: asPath === "/category/men" ? "white" : "black",
                }}
              >
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/category/women'>
            <Link>
              <Button
                style={{
                  backgroundColor:
                    asPath === "/category/women" ? "black" : "white",
                  color: asPath === "/category/women" ? "white" : "black",
                }}
              >
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href='/category/children'>
            <Link>
              <Button
                style={{
                  backgroundColor:
                    asPath === "/category/children" ? "black" : "white",
                  color: asPath === "/category/children" ? "white" : "black",
                }}
              >
                Children
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />

        <IconButton>
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart'>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={() => toggleSideMenu()}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
