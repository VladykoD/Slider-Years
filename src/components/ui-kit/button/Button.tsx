import { ReactNode } from "react";
import clsx from "clsx";
import Link from "next/link";
import styles from "./Button.module.scss";

interface ButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  href?: string;
  blank?: boolean;
  bg?: "white" | "outline";
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
  eventAction?: string;
  loading?: boolean;
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
  type = "submit",
  eventAction,
  loading = false,
  ...rest
}: ButtonProps) {
  // const [focus, setFocus] = useState(false);

  const handleClick = () => {
    onClick?.();
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
        loading && styles.loading,
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
        loading && styles.loading,
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
