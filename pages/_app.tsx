import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import { CssBaseline, ThemeProvider } from "@mui/material";

import { lightTheme } from "../themes";
import UiProvider from "../context/ui/UiProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 10000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <UiProvider isMenuOpen={false}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </SWRConfig>
  );
}

export default MyApp;
