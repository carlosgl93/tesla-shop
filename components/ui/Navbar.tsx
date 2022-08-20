import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  ClearOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { UiContext } from "../../context";
import { useContext, useState } from "react";

const Navbar = () => {
  const { asPath, push } = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

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
        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
        >
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
        {/* pantallas grandes */}
        {/* <IconButton>
          <SearchOutlined />
        </IconButton> */}

        {isSearchVisible ? (
          <Input
            sx={{ display: { xs: "none", sm: "flex" } }}
            className='fadeIn'
            autoFocus={true}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
            type='text'
            placeholder='Search...'
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={() => setIsSearchVisible(false)}>
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        ) : (
          <IconButton
            sx={{ display: { xs: "none", sm: "flex" } }}
            onClick={() => setIsSearchVisible(true)}
            className='fadeIn'
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* pantallas pequenas */}

        <IconButton
          sx={{ display: { xs: "flex", sm: "none", md: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href='/cart'>
          <Link sx={{ mr: "1vw" }}>
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
