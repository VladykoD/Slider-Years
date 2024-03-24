import React, { HTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { YearsSlider } from "@/components/ui-kit/slider/ui";
import { slides } from "./mock";

export type SliderSectionProps = HTMLAttributes<SVGElement> & {
  className?: string;
};

export const SliderSection = ({ className, ...props }: SliderSectionProps) => (
  <section className={clsx(className, styles.section)}>
    <div className={styles.container}>
      <YearsSlider title={"Исторические даты"} slides={slides} />
    </div>
  </section>
);
