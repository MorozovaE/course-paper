import React from "react";

import styles from "./rewardList.module.scss";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { ReactComponent as DownloadIcon } from "../../assets/icons/downloadArrow.svg";

import { Reward } from "../Reward/Reward";
import { CreateRewardModal } from "../CreateRewardModal/CreateRewardModal";

export const RewardList = () => {
  const [modalActive, setModalActive] = React.useState(false);
  // const inputRef = React.useRef();
  // const [inputRewardName, setInputRewardName] = React.useState("");

  return (
    <div className={styles.root}>
      <header>
        <div className={styles.caption}>
          <span>Награды</span>
          <div
            className={styles.addRewardbBtn}
            onClick={() => setModalActive(true)}
          >
            <PlusIcon />
            Добавить
          </div>
          <CreateRewardModal active={modalActive} setActive={setModalActive} />
        </div>
        <div>
          <SearchIcon />
          <SortIcon />
        </div>
      </header>
      <div>
        <Reward />
      </div>
    </div>
  );
};
