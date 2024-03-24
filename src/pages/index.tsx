import { NextPageWithLayout } from "next";
import { DefaultLayout } from "@/layouts/default/DefaultLayout";
import { SliderSection } from "@/components/blocks/slider-section/SliderSection";

const Page: NextPageWithLayout = () => (
  <>
    <SliderSection />
  </>
);

Page.layout = DefaultLayout;

export default Page;
