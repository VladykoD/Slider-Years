import "@/styles/global.scss";
import { NextPageWithLayout } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultLayout } from "@/layouts/default/DefaultLayout";
import { useCalc } from "@/hooks/useCalc";
import { Sprite } from "@/components/ui-kit/sprite/Sprite";
import "@/styles/index.scss";
import { LayoutGrid } from "@/components/ui-kit/layout-grid/LayoutGrid";

export default function App({ Component, pageProps }: AppProps) {
  let Layout = DefaultLayout;
  if ("layout" in Component) {
    Layout = (Component as NextPageWithLayout).layout;
  }
  useCalc();

  return (
    <>
      <Head>
        <title>Тестовое</title>

        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,user-scalable=no"
        />
      </Head>

      <Layout>
        <Component {...pageProps} />
      </Layout>

      <Sprite />
      <LayoutGrid />
    </>
  );
}
