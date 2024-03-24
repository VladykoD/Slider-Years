import React, { useState } from "react";
import clsx from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./styles.module.scss";
import { Slide } from "./types";

interface ConnectedSlidersProps {
  sliderId: string;
  slides: Slide[];
}

export const ConnectedSliders = ({
  sliderId,
  slides,
}: ConnectedSlidersProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [inited, setInited] = useState(false);
  const [tablet, setTablet] = useState(false);

  return (
    <div className={styles.doubleSlider}>
      <Swiper
        onInit={() => setInited(true)}
        id={`main-${sliderId}`}
        spaceBetween={16}
        navigation
        loop
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={clsx(styles.mainSlider, inited && styles.active)}
      >
        {slides.map((elem, i) => (
          <SwiperSlide
            className={clsx(styles.mainSlider__slide)}
            key={`main-${elem.id}`}
          >
            <p>{elem.date[0]}</p>
            <p>{elem.date[1]}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onInit={() => setInited(true)}
        // @ts-ignore
        onSwiper={setThumbsSwiper}
        id={`nav-${sliderId}`}
        slidesPerView={3}
        navigation
        spaceBetween={tablet ? 8 : 16}
        loop
        modules={[FreeMode, Navigation, Thumbs]}
        className={clsx(styles.navigationSlider, inited && styles.active)}
      >
        {slides.map((elem, i) => (
          <SwiperSlide
            className={clsx(styles.navigationSlider__slide)}
            key={`nav-${elem}`}
          >
            <p>{elem.id}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
