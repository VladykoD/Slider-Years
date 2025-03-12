import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { scrollData } from "@/components/blocks/scroll-section/mock";
import { useIsVisible } from "@/hooks/useIsVisible";
import { Breakpoint, useBreakpoint } from "@/hooks/useBreakpoint";

export function clamp(x: number, min: number, max: number) {
  return Math.min(Math.max(x, min), max);
}

export const ScrollSection = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const [initialTitleY, setInitialTitleY] = useState<number[]>([]);
  const [screenOffset, setScreenOffset] = useState(0);

  //чтобы для каждого компонента не считать где начинается мобилка
  const bp = useBreakpoint();

  // intersectionObserver, чтобы анимация работала когда блок на экране
  const isVisible = useIsVisible(parentRef, 0, "10%");

  const calculateInitialTranslateY = () => {
    if (!parentRef.current || !titleRefs.current || bp < Breakpoint.Tablet)
      return;

    // наша анимация начинается тогда, когда блок виден на 1/3 от высоты экрана
    setScreenOffset(window.innerHeight / 3);

    const parentTop = parentRef.current.getBoundingClientRect().top;
    const titlesY: number[] = [];

    // сдвинуть вверх все title
    titleRefs.current.forEach((title, i) => {
      if (title) {
        // Сброс значения transform перед новым вычислением
        title.style.transform = ``;

        const rect = title.getBoundingClientRect().top;

        // Позиция заголовка относительно родителя
        // index * 20 - сдвиг относительно предыдущего элемента, там надо выставить своё значние на основе font-size * line-height + отступ между элементами
        titlesY[i] = -1 * (rect - parentTop - i * 20);

        title.style.transform = `translateY(${titlesY[i]}px)`;
      }
    });

    setInitialTitleY(titlesY);
  };

  const handleScroll = () => {
    if (!parentRef.current || !isVisible || bp < Breakpoint.Tablet) return;

    let parentTop =
      parentRef.current.getBoundingClientRect().top - screenOffset;

    const offset = clamp(parentTop, parentTop, 0);

    titleRefs.current.forEach((title, i) => {
      if (title) {
        const newY = initialTitleY[i] - offset;
        // clamp делает так, чтобы значение не было меньше значения при иницииализации и останавливалось в 0
        // 0 - это значение, когда наш заголовок становится на своё место
        const clampedY = clamp(initialTitleY[i], newY, 0);
        title.style.transform = `translateY(${clampedY}px)`;
      }
    });
  };

  // Эффект для вычисления начальных позиций при монтировании и ресайзе
  useEffect(() => {
    calculateInitialTranslateY();
    handleScroll();

    window.addEventListener("resize", calculateInitialTranslateY);
    window.addEventListener("resize", handleScroll);
    window.addEventListener("load", calculateInitialTranslateY);

    return () => {
      window.removeEventListener("resize", calculateInitialTranslateY);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("load", calculateInitialTranslateY);
    };
  }, [calculateInitialTranslateY, handleScroll]);

  // Отдельный эффект для обработки скролла
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div ref={parentRef} className={styles.wrap}>
          {scrollData.map((item, index) => (
            <div key={index} className={styles.item}>
              <h4
                ref={(el) => {
                  titleRefs.current[index] = el;
                }}
                className={styles.title}
              >
                {item.title}
              </h4>
              <div className={styles.text}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
