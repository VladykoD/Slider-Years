import React, { ReactNode } from "react";
import styles from "./DefaultLayout.module.scss";

export interface LayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: LayoutProps) {
  return <div className={styles.layout}>{children}</div>;
}
