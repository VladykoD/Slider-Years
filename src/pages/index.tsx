import { NextPageWithLayout } from "next";
import { DefaultLayout } from "@/layouts/default/DefaultLayout";

const Page: NextPageWithLayout = () => (
  <>
    <h1>HELLO</h1>
  </>
);

Page.layout = DefaultLayout;

export default Page;
