import { useState } from "react";
import styles from "./LayoutGrid.module.scss";

export function LayoutGrid() {
  const [isGridVisible, setIsGridVisible] = useState(false);

  return (
    <>
      <label className={styles.range}>
        включить сетку?
        <input
          onChange={(e) => setIsGridVisible(e.target.checked)}
          type="checkbox"
        />
      </label>
      <div style={{ opacity: isGridVisible ? 0.3 : 0 }} className={styles.wrap}>
        {Array.from({ length: 24 }, (_, index) => (
          <div key={index} />
        ))}
      </div>
    </>
  );
}
