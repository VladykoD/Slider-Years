import React from "react";
import styles from "./styles.module.scss";
import { Slide } from "@/components/ui-kit/slider/lib/types";

interface Props {
  index: number;
  slides: Slide[];
}

export const StringsAnimation = () => {
  return (
    <div className={styles.title}>
      <span>Эволюция персональных компьютеров</span>
    </div>
  );
};
