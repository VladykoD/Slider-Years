import React from "react";
import { Slide } from "@/components/ui-kit/slider/lib/types";
import { Button } from "@/components/ui-kit/button";
import clsx from "clsx";
import styles from "./styles.module.scss";

interface Props {
  index: number;
  max: number;
  slides: Slide[];
  clickEvent: (i: number) => void;
}

export const RoundSlider = ({ slides, max, index, clickEvent }: Props) => {
  const getAngle = (i: number) => {
    return (360 / max) * i - (360 / max) * index;
  };

  return (
    <div className={styles.slider}>
      {slides.map((slide, i) => (
        <div
          key={slide.category}
          style={{ transform: `rotate(${getAngle(i) * -1}deg)` }}
          className={clsx(styles.axis, { [styles.active]: index === i })}
        >
          <div
            className={styles.wrap}
            style={{ transform: `rotate(${getAngle(i) + 240}deg)` }}
          >
            <Button
              data-id={i + 1}
              onClick={() => clickEvent(i)}
              className={styles.roundbtn}
              bg="outline"
              size="large"
            />

            <span
              className={styles.label}
              dangerouslySetInnerHTML={{ __html: slide.category }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
