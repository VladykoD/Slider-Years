import React from "react";
import { Slide, useChangeIndex } from "../lib";
import { Title } from "@/components/ui-kit/title/Title";
import { SmallNav } from "./small-nav";
import { StringsAnimation } from "./strings-animation";
import { Slider } from "./slide";
import { RoundSlider } from "./round-slider";

import styles from "./styles.module.scss";

interface ConnectedSlidersProps {
  slides: Slide[];
  title: string;
}

export const YearsSlider = ({ slides, title }: ConnectedSlidersProps) => {
  const max = slides.length;
  const { index, goNext, goPrev, goToIndex } = useChangeIndex(max);

  return (
    <>
      <Title as="h2" design="h2">
        {title}
      </Title>

      <div className={styles.wrapper}>
        <RoundSlider
          clickEvent={(i) => goToIndex(i)}
          max={max}
          index={index}
          slides={slides}
        />
        <StringsAnimation index={index} slides={slides} />
      </div>

      <SmallNav index={index} max={max} nextEvent={goNext} prevEvent={goPrev} />

      <Slider slides={slides} index={index} />
    </>
  );
};
