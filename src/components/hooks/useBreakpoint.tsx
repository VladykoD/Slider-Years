import { useEffect, useState } from 'react';

export enum Breakpoint {
  Mobile,
  Tablet,
  Desktop,
  DesktopXl,
}

export function useBreakpoint() {
  const [state, setState] = useState<Breakpoint>(Breakpoint.Mobile);

  useEffect(() => {
    const handler = () => {
      setState(() => {
        const w = window.innerWidth;

        if (w <= 767) {
          return Breakpoint.Mobile;
        }
        if (w > 767 && w < 1025) {
          return Breakpoint.Tablet;
        }
        if (w > 1025 && w < 1441) {
          return Breakpoint.Desktop;
        }

        return Breakpoint.DesktopXl;
      });
    };
    handler();
    window.addEventListener('resize', handler, {
      passive: true,
    });

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);

  return state;
}
