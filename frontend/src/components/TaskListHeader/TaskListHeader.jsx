import React from "react";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import styles from "./taskListHeader.module.scss";

export const TaskListHeader = () => {
  return (
    <header className={styles.headerContainer}>
      <span>Задачи</span>
      <div>
        <SearchIcon />
        <SortIcon />
      </div>
    </header>
  );
};
