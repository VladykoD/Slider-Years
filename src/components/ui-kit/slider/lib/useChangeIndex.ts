import { useMemo, useState } from "react";

export const useChangeIndex = (max: number) => {
  const [index, setIndex] = useState(0);

  const goNext = () => {
    setIndex((prevIndex) => (prevIndex === max - 1 ? 0 : prevIndex + 1));
  };

  const goPrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? max - 1 : prevIndex - 1));
  };

  const goToIndex = (i: number) => {
    console.log(i);
    setIndex(i);
  };

  return useMemo(
    () => ({
      index,
      max,
      goNext,
      goPrev,
      goToIndex,
    }),
    [index],
  );
};
