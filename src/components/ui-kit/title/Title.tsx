import React, { HTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";

export interface TitleProps extends HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "p" | "div"; // в какие теги обернуть
  design?: "h1" | "h2" | "h3"; // какие стили навесить
  raw?: string;
}

export const Title = React.forwardRef<
  HTMLElement,
  PropsWithChildren<TitleProps>
>(({ as: Tag = "div", design, raw, className, children, ...rest }, ref) =>
  React.createElement(
    Tag,
    {
      ref,
      className: clsx(design && styles[design], className),
      ...rest,
      ...(raw ? { dangerouslySetInnerHTML: { __html: raw } } : {}),
    },
    !raw ? children : null,
  ),
);
