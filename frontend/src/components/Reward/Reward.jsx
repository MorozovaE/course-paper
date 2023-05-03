import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

import ItalyImg from "../../assets/img/italy.png";
import styles from "./reward.module.scss";
import { useDispatch } from "react-redux";
import {
  setSelectedRewardId,
} from "../../store/features/rewardsSlice";

export const Reward = ({ reward }) => {
  const [rewardName, setRewardName] = React.useState(reward.name);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setRewardName(reward.name);
  }, [reward.name]);

  return (
    <div
      className={styles.root}
      onClick={() => dispatch(setSelectedRewardId(reward.id))}
    >
      <img src={ItalyImg} alt="" />
      <span className={styles.rewardName}>{rewardName}</span>
      <div className={styles.progressbarContainer}>
        <ProgressBar className={styles.progress} now={60} />
        <span className={styles.progressCount}>27/30</span>
      </div>
    </div>
  );
};
