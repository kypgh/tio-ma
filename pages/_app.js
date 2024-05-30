import { useRouter } from "next/router";
import NProgress from "nprogress";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import "../styles/nprogress.css";

import Script from "next/script";
import Layout from "../components/Layout";
import NotificationProvider from "../components/actionNotification/NotificationProvider";
import { languages } from "../config/languageConfig";
import GlobalStyle from "../styles/globalstyles";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }) {
  const [langObject, setLangObject] = useState();

  const { events, locale, query } = useRouter();

  useEffect(() => {
    setLangObject(languages[locale]);
    document.body.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  useEffect(() => {
    events.on("routeChangeStart", () => NProgress.start());
    events.on("routeChangeComplete", () => NProgress.done());
    events.on("routeChangeError", () => NProgress.done());
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { refetchOnWindowFocus: false, refetchOnMount: true },
        },
      })
  );
  const { genericTranslations } = pageProps;
  useEffect(() => {
    let existingUTMs;
    try {
      if (navigator.cookieEnabled) {
        existingUTMs = JSON.parse(window.localStorage.getItem("utm"));
      }

      const utm_campaign = query?.utm_campaign
        ? query?.utm_campaign
        : existingUTMs?.utm_campaign || "0";

      const utm_source = query?.utm_source
        ? query?.utm_source
        : existingUTMs?.utm_source || "0";

      const utm_medium = query?.utm_medium
        ? query?.utm_medium
        : existingUTMs?.utm_medium || "0";

      const utm_content = query?.utm_content
        ? query?.utm_content
        : existingUTMs?.utm_content || "0";

      const utm_term = query?.utm_term
        ? query?.utm_term
        : existingUTMs?.utm_term || "0";

      if (navigator.cookieEnabled) {
        window.localStorage.setItem(
          "utm",
          JSON.stringify({
            utm_campaign,
            utm_source,
            utm_medium,
            utm_content,
            utm_term,
          })
        );
      }
    } catch (error) {}
  }, [query]);
  return (
    <>
      <Script
        src={`//tiomarkets.whoson.com/include.js?domain=www.tiomarkets.com`}
        async
        onLoad={() => {
          if (sWOTrackPage) sWOTrackPage();
        }}
      />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <NotificationProvider>
              <Layout genericTranslations={genericTranslations}>
                <Component {...pageProps} langObject={langObject} />
              </Layout>
            </NotificationProvider>
          </ThemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}
