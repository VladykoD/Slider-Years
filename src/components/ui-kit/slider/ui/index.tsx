import React from "react";
import { Slide, useChangeIndex } from "../lib";
import { SmallNav } from "./small-nav";
import { StringsAnimation } from "./strings-animation";
import { Slider } from "./slide";
import { RoundSlider } from "./round-slider";

import styles from "./styles.module.scss";

interface ConnectedSlidersProps {
  slides: Slide[];
}

export const YearsSlider = ({ slides }: ConnectedSlidersProps) => {
  const max = slides.length;
  const { index, goNext, goPrev, goToIndex } = useChangeIndex(max);

  return (
    <>
      <div className={styles.wrapper}>
        <RoundSlider
          clickEvent={(i) => goToIndex(i)}
          max={max}
          index={index}
          slides={slides}
        />
        <StringsAnimation />
      </div>

      <SmallNav index={index} max={max} nextEvent={goNext} prevEvent={goPrev} />

      <Slider slides={slides} index={index} />
    </>
  );
};
