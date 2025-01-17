import "@/styles/global.scss";
import { NextPageWithLayout } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultLayout } from "@/layouts/default";
import { useCalc } from "@/hooks/useCalc";
import { Sprite } from "@/components/ui-kit/sprite/Sprite";
import "@/styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  let Layout = DefaultLayout;
  if ("layout" in Component) {
    Layout = (Component as NextPageWithLayout).layout;
  }
  useCalc();

  return (
    <>
      <Head>
        <title>Разное</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no"
        />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Sprite />
    </>
  );
}
