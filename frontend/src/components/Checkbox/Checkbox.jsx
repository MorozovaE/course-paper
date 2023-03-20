import React from "react";
import styles from "./checkbox.module.scss";

export const Checkbox = ({ task }) => {
  const handleCheck = (event) => {
    event.stopPropagation();
  };

  return (
    <>
      <label onClick={handleCheck}>
        <input type="checkbox" className={styles.checkbox} />
        <span className={styles.bubble}></span>
      </label>
    </>
  );
};
