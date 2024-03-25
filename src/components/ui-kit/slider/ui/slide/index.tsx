import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { Navigation } from "swiper/modules";
import { Slide } from "@/components/ui-kit/slider/lib/types";
import { Button } from "@/components/ui-kit/button";
import { Icon } from "@/components/ui-kit/sprite/Icon";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
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
        slidesPerView={3}
        navigation={{
          nextEl: `.button-next`,
          prevEl: `.button-prev`,
        }}
        speed={isHidden ? 0 : 300}
        modules={[Navigation]}
      >
        {slides[activeIndex].events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className={styles.slide}>
              <p className={styles.title}>{event.date}</p>
              <div dangerouslySetInnerHTML={{ __html: event.description }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Button
        size="small"
        className={clsx(styles.navBtn, styles.prev, `button-prev`)}
      >
        <Icon size={10} id="prev" />
      </Button>
      <Button
        size="small"
        className={clsx(styles.navBtn, styles.next, `button-next`)}
      >
        <Icon size={10} id="next" />
      </Button>
    </div>
  );
};
