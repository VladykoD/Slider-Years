import React from "react";
import { Button } from "@/components/ui-kit/button";
import { Icon } from "@/components/ui-kit/sprite/Icon";
import styles from "./styles.module.scss";

interface ParentNavProps {
  max: number;
  index: number;
  nextEvent: () => void;
  prevEvent: () => void;
}

export const SmallNav = ({
  nextEvent,
  prevEvent,
  index,
  max,
}: ParentNavProps) => {
  const formattedIndex = `0${index + 1}`.slice(-2);
  const formattedMax = `0${max}`.slice(-2);

  return (
    <div>
      <div className={styles.progress}>
        {formattedIndex} / {formattedMax}
      </div>
      <div className={styles.buttons}>
        <Button disabled={index === 0} onClick={prevEvent} bg="outline">
          <Icon size={14} id="prev" />
        </Button>
        <Button disabled={index === max - 1} onClick={nextEvent} bg="outline">
          <Icon size={14} id="next" />
        </Button>
      </div>
    </div>
  );
};
