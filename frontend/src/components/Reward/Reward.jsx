import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

import ItalyImg from "../../assets/img/italy.png";
import styles from "./reward.module.scss";

export const Reward = () => {
  return (
    <div className={styles.root}>
      <img src={ItalyImg} alt="" />
      <span className={styles.rewardName}>Поехать в Италию</span>
      <div className={styles.progressbarContainer}>
        <ProgressBar className={styles.progress} now={60} />
        <span className={styles.progressCount}>27/30</span>
      </div>
      {/* <ProgressBar variant="success" className={styles.progress} now={10} /> */}
    </div>
  );
};
