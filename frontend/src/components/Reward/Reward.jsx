import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

import ItalyImg from "../../assets/img/italy.png";
import styles from "./reward.module.scss";

export const Reward = () => {
  return (
    <div className={styles.root}>
      <img src={ItalyImg} alt="" />
      <span>Поехать в Италию</span>
      <ProgressBar className={styles.progress} now={60} />
      {/* <ProgressBar variant="success" className={styles.progress} now={10} /> */}
    </div>
  );
};
