import React from "react";
import styles from "./styles.module.scss";
import { Slide } from "@/components/ui-kit/slider/lib/types";
import clsx from "clsx";

interface Props {
  index: number;
  max: number;
  slides: Slide[];
  clickEvent: (i: number) => void;
}

export const StringsAnimation = ({ slides, max, index, clickEvent }: Props) => {
  const getAngle = (i: number) => {
    return (360 / max) * i - (360 / max) * index;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>{slides[index].date[0]}</span>
        <span>{slides[index].date[1]}</span>
      </div>
      <div className={styles.roundSlider}>
        {slides.map((slide, i) => (
          <div
            key={slide.category}
            style={{
              transform: `rotate(${getAngle(i) * -1}deg)`,
            }}
            className={clsx(styles.axis, index === i && styles.active)}
          >
            <div
              className={styles.buttonsWrap}
              style={{
                transform: `rotate(${getAngle(i) + 240}deg)`,
              }}
            >
              <button
                data-id={i + 1}
                onClick={() => clickEvent(i)}
                className={styles.roundbtn}
              ></button>
              <span className={styles.label}>{slide.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
