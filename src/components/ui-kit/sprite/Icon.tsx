import React, { HTMLAttributes } from "react";

export type Props = HTMLAttributes<SVGElement> & {
  id: string;
  size?: number;
};

export const Icon = ({ className, id, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMid meet"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <use xlinkHref={`${id}`} />
  </svg>
);
