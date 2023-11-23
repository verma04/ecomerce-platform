// pages/_app.tsx
import "../styles/globals.css";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import { CacheProvider, EmotionCache } from "@emotion/react";
import Protect from "react-app-protect";
import "react-app-protect/dist/index.css";
import createEmotionCache from "@/utility/createEmotionCache";
import NextNProgress from "nextjs-progressbar";

const clientSideEmotionCache = createEmotionCache();
import "react-quill/dist/quill.snow.css";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
import { StyledEngineProvider } from "@mui/material/styles";

import { Toaster } from "react-hot-toast";
import { theme } from "@/theme/theme";

import { ToastContainer } from "react-toastify";
import withApplo from "@/components/hoc/withApplo";
const prod = process.env.NODE_ENV === "production";
function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  React.useEffect(() => {
    if (prod) {
      // define a custom handler function
      // for the contextmenu event
      const handleContextMenu = (e: any) => {
        // prevent the right-click menu from appearing
        e.preventDefault();
      };

      // attach the event listener to
      // the document object
      document.addEventListener("contextmenu", handleContextMenu);

      // clean up the event listener when
      // the component unmounts
      return () => {
        document.removeEventListener("contextmenu", handleContextMenu);
      };
    }
  }, []);
  return (
    <>
      {typeof window !== "undefined" && (
        <Protect sha512="EE26B0DD4AF7E749AA1A8EE3C10AE9923F618980772E473F8819A5D4940E0DB27AC185F8A0E1D5F84F88BC887FD67B143732C304CC5FA9AD8E6F57F50028A8FF">
          <CacheProvider value={emotionCache}>
            <Toaster />

            <NextNProgress height={2} color="#ed247c" />

            <Head>
              <link rel="icon" type="image/x-icon" href="/favicon.png"></link>
              <title>Dashboard - DeshBazaaar</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1"
              ></meta>
            </Head>
            <ThemeProvider theme={theme}>
              <StyledEngineProvider injectFirst>
                <ToastContainer />
                <Component {...pageProps} />
              </StyledEngineProvider>
            </ThemeProvider>
          </CacheProvider>
        </Protect>
      )}
    </>
  );
}

export default withApplo(App);
