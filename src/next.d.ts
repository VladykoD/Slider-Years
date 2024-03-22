import type { NextPage } from "next";

declare module "next" {
  export declare type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    layout: ({ children: ReactNode }) => JSX.Element;
  };
}
