import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./styles.module.scss";
import { Navigation } from "swiper/modules";
import { Slide } from "@/components/ui-kit/slider/lib/types";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import clsx from "clsx";
import { Button } from "@/components/ui-kit/button/Button";
import { Icon } from "@/components/ui-kit/sprite/Icon";

interface SliderProps {
  slides: Slide[];
  index: number;
}

export const Slider = ({ slides, index }: SliderProps) => {
  const [swiperEl, setSwiperEl] = useState<any>(null);
  const [active, setActive] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (!swiperEl) return;

    setHide(true);
    const timeoutId = setTimeout(() => {
      swiperEl.slideTo(0);
      setActive(index);
      setHide(false);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [index, swiperEl]);

  return (
    <div className={clsx(styles.slider, hide && styles.hide)}>
      <Swiper
        onSwiper={(swiper) => setSwiperEl(swiper)}
        spaceBetween={0}
        slidesPerView={3}
        navigation={{
          nextEl: `.button-next`,
          prevEl: `.button-prev`,
        }}
        speed={hide ? 0 : 300}
        modules={[Navigation]}
      >
        {slides[active].events.map((event) => (
          <SwiperSlide key={event.id}>
            <div className={styles.slide}>
              <p className={styles.title}>{event.date}</p>
              <p dangerouslySetInnerHTML={{ __html: event.description }} />
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
