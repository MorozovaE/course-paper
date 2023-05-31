import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./reward.module.scss";
import { useDispatch } from "react-redux";
import { setSelectedRewardId } from "../../store/features/rewardsSlice";

//skeleton

export const Reward = ({ reward }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={styles.root}
      onClick={() => dispatch(setSelectedRewardId(reward.id))}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${reward.imageUrl})` }}
      ></div>
      {reward.name ? (
        <span className={styles.rewardName}>{reward.name}</span>
      ) : (
        <span className={styles.emptyName}>Нет названия награды</span>
      )}
      <div className={styles.progressbarContainer}>
        <ProgressBar className={styles.progress} now={60} />
        <span className={styles.progressCount}>27/30</span>
      </div>
    </div>
  );
};
