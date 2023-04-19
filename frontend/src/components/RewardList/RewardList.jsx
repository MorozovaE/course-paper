import React from "react";

import styles from "./rewardList.module.scss";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { Reward } from "../Reward/Reward";

export const RewardList = () => {
  return (
    <div className={styles.root}>
      <header>
        <div className={styles.caption}>
          <span>Награды</span>
          <div>
            <PlusIcon />
            Добавить
          </div>
        </div>

        <div>
          <SearchIcon />
          <SortIcon />
        </div>
      </header>
      <div>
        <Reward/>
      </div>
    </div>
  );
};
