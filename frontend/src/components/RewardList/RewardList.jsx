import React from "react";

import styles from "./rewardList.module.scss";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";

import { Reward } from "../Reward/Reward";
import { CreateRewardModal } from "../CreateRewardModal/CreateRewardModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRewards,
  rewardsSelector,
} from "../../store/features/rewardsSlice";

export const RewardList = () => {
  const dispatch = useDispatch();
  const [modalActive, setModalActive] = React.useState(false);
  const items = useSelector(rewardsSelector);

  React.useEffect(() => {
    dispatch(getAllRewards());
  }, []);

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

      <div className={styles.rewardsContainer}>
        {items.map((reward) => (
          <Reward key={reward.id} reward={reward} />
        ))}
      </div>
    </div>
  );
};
