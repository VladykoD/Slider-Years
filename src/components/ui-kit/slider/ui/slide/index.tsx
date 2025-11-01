import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { Pagination } from "swiper/modules";
import { Slide } from "@/components/ui-kit/slider/lib/types";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import clsx from "clsx";

interface SliderProps {
  slides: Slide[];
  index: number;
}

export const Slider = ({ slides, index }: SliderProps) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!swiperInstance) return;

    setIsHidden(true);
    const timeoutId = setTimeout(() => {
      swiperInstance.slideTo(0);
      setActiveIndex(index);
      setIsHidden(false);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [index, swiperInstance]);

  return (
    <div className={clsx(styles.slider, isHidden && styles.hide)}>
      <Swiper
        onSwiper={setSwiperInstance}
        spaceBetween={0}
        slidesPerView={2}
        pagination={{
          clickable: true,
        }}
        speed={isHidden ? 0 : 300}
        modules={[Pagination]}
        className={styles.swipr}
      >
        {slides[activeIndex].events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className={styles.slide}>
              <p className={styles.title}>{event.date}</p>
              <div
                className={styles.text}
                dangerouslySetInnerHTML={{ __html: event.description }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
