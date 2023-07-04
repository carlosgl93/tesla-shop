import { useContext, useState } from "react";
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
import { CartContext, UiContext } from "../../context";

export const Navbar = () => {
  const { asPath, push } = useRouter();
  const { toggleSideMenu } = useContext(UiContext);
  const { cart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;
    push(`/search/${searchTerm}`);
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant="h6">Tesla | </Typography>
            <Typography variant="h6" sx={{ ml: 0.5 }}>
              Shop
            </Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box
          sx={{
            display: isSearchVisible ? "none" : { xs: "none", sm: "block" },
          }}
          className="fadeIn"
        >
          <NextLink href="/category/men">
            <Link>
              <Button color={asPath === "/category/men" ? "primary" : "info"}>
                Men
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/women">
            <Link>
              <Button color={asPath === "/category/women" ? "primary" : "info"}>
                Women
              </Button>
            </Link>
          </NextLink>
          <NextLink href="/category/children">
            <Link>
              <Button
                color={asPath === "/category/children" ? "primary" : "info"}
              >
                Children
              </Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />

        {/* desktop */}

        {isSearchVisible && (
          <Input
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
            className="fadeIn"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSearchTerm()}
            type="text"
            placeholder="Search..."
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearchTerm("");
                    setIsSearchVisible(false);
                  }}
                >
                  <ClearOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        )}

        {!isSearchVisible && (
          <IconButton
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
            onClick={() => setIsSearchVisible(!isSearchVisible)}
          >
            <SearchOutlined />
          </IconButton>
        )}

        {/* mobile */}
        <IconButton
          sx={{
            display: {
              xs: "flex",
              sm: "none",
            },
          }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink href="/cart">
          <Link>
            <IconButton>
              <Badge
                badgeContent={cart.length > 10 ? "+9" : cart.length}
                color="secondary"
              >
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
