import React from "react";
import { YearsSlider } from "@/components/ui-kit/slider/ui";
import { slides } from "./mock";
import styles from "./styles.module.scss";

export const SliderSection = () => (
  <section className={styles.section}>
    <div className={styles.container}>
      <YearsSlider slides={slides} />
    </div>
  </section>
);
