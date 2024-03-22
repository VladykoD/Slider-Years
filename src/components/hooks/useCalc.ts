import { useEffect } from 'react';

export const useCalc = () => {
  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;

      setTimeout(() => {
        doc.style.setProperty('--vh', `${window.innerHeight}px`);
      }, 50);
    };
    appHeight();
    window.addEventListener('resize', appHeight);

    return () => window.removeEventListener('resize', appHeight);
  }, []);
};
