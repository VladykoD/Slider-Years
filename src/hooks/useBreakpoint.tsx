import { useEffect, useState } from "react";

export enum Breakpoint {
  Mobile,
  Tablet,
  Desktop,
  DesktopXl,
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(Breakpoint.Mobile);

  useEffect(() => {
    const calculateBreakpoint = (width: number) => {
      if (width <= 767) return Breakpoint.Mobile;
      if (width <= 1024) return Breakpoint.Tablet;
      if (width <= 1440) return Breakpoint.Desktop;
      return Breakpoint.DesktopXl;
    };

    const handler = () => {
      setBreakpoint(calculateBreakpoint(window.innerWidth));
    };

    handler();
    window.addEventListener("resize", handler);

    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  return breakpoint;
}
