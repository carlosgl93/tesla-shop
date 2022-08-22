import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { lightTheme } from "../themes";
import UiProvider from "../context/ui/UiProvider";
import CartProvider from "../context/cart/CartProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <CartProvider cart={[]} numberOfItems={0} subTotal={0} tax={0} total={0}>
        <UiProvider isMenuOpen={false} showSnackbar={false}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UiProvider>
      </CartProvider>
    </SWRConfig>
  );
}

export default MyApp;
