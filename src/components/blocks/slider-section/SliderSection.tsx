import React, { HTMLAttributes } from "react";
import { Title } from "@/components/ui-kit/title/Title";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { ConnectedSliders } from "@/components/ui-kit/slider";
import { slides } from "@/components/ui-kit/slider/mock";

export type SliderSectionProps = HTMLAttributes<SVGElement> & {
  className?: string;
};

export const SliderSection = ({ className, ...props }: SliderSectionProps) => (
  <section className={clsx(className, styles.section)}>
    <div className={styles.container}>
      <Title as="h2" design="h2">
        Исторические даты
      </Title>

      <ConnectedSliders sliderId={"001"} slides={slides} />
    </div>
  </section>
);
