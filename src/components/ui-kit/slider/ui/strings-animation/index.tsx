import React from "react";
import styles from "./styles.module.scss";
import { Slide } from "@/components/ui-kit/slider/lib/types";

interface Props {
  index: number;
  slides: Slide[];
}

export const StringsAnimation = ({ slides, index }: Props) => {
  return (
    <div className={styles.title}>
      <span>{slides[index].date[0]}</span>
      <span>{slides[index].date[1]}</span>
    </div>
  );
};
