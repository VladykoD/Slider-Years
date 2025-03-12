import { NextPageWithLayout } from "next";
import { DefaultLayout } from "@/layouts/default";
import { ScrollSection } from "@/components/blocks/scroll-section";

const Page: NextPageWithLayout = () => (
  <>
    <div className={"empty"} />
    <div className={"empty"} />
    <div className={"empty"} />
    <ScrollSection />
    <div className={"empty"} />
    <div className={"empty"} />
    <div className={"empty"} />
  </>
);

Page.layout = DefaultLayout;

export default Page;
