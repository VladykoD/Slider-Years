import { NextPageWithLayout } from "next";
import { DefaultLayout } from "@/layouts/default";
import { ScrollSection } from "@/components/blocks/scroll-section";

const Page: NextPageWithLayout = () => (
    <SliderSection />
);

Page.layout = DefaultLayout;

export default Page;
