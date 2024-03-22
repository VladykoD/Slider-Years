import { useEffect, useMemo, useState } from "react";

export const useCalc = () => {
  const [vw, setVw] = useState<number>(375);
  const [vh, setVh] = useState<number>(700);

  useEffect(() => {
    let timer = 0;

    const handler = () => {
      const doc = document.documentElement;

      setTimeout(() => {
        const vh = window.innerHeight;
        const vw = window.innerWidth;

        setVh(vh);
        setVw(vw);

        doc.style.setProperty("--vh", `${vh}px`);
        doc.style.setProperty("--vw", `${vw}px`);
      }, 50);
    };

    handler();
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler, {
      passive: true,
    });

    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, []);

  return useMemo(() => ({ vw, vh }), [vw, vh]);
};
