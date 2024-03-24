import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui-kit/button/Button";
import { Icon } from "@/components/ui-kit/sprite/Icon";

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
}: ParentNavProps) => (
  <div>
    <div className={styles.progress}>
      0{index + 1} / 0{max}
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
