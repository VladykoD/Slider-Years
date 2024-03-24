import React, { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  blank?: boolean;
  bg?: "white" | "outline";
  size?: "small" | "medium" | "large";
}

export function Button({
  children,
  href,
  blank,
  className,
  onClick,
  disabled,
  bg = "white",
  size = "medium",
  ...rest
}: ButtonProps) {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return href ? (
    <Link
      onClick={handleClick}
      href={href}
      target={blank ? "_blank" : ""}
      className={clsx(
        className,
        styles.button,
        styles[bg],
        styles[size],
        disabled && styles.disabled,
      )}
      rel={blank ? "noreferrer noopener" : ""}
    >
      {children}
    </Link>
  ) : (
    <button
      onClick={handleClick}
      className={clsx(
        className,
        styles.button,
        styles[bg],
        styles[size],
        disabled && styles.disabled,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
