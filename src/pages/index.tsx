import { NextPageWithLayout } from "next";
import { DefaultLayout } from "@/layouts/default";
import { SliderSection } from "@/components/blocks/slider-section";

const Page: NextPageWithLayout = () => (
  <>
    <SliderSection />
  </>
);

Page.layout = DefaultLayout;

export default Page;
