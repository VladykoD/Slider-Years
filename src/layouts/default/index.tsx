import React, { ReactNode } from "react";
import styles from "./styles.module.scss";

export interface LayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: LayoutProps) {
  return <main className={styles.layout}>{children}</main>;
}
