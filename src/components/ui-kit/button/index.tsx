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

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  blank,
  className,
  onClick,
  disabled,
  bg = "white",
  size = "medium",
  ...rest
}) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const buttonClassName = clsx(
    className,
    styles.button,
    styles[bg],
    styles[size],
    { [styles.disabled]: disabled },
  );

  return href ? (
    <Link href={href} passHref>
      <a
        target={blank ? "_blank" : "_self"}
        rel={blank ? "noreferrer noopener" : ""}
        className={buttonClassName}
        onClick={handleClick}
        {...rest}
      >
        {children}
      </a>
    </Link>
  ) : (
    <button
      disabled={disabled}
      className={buttonClassName}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};
