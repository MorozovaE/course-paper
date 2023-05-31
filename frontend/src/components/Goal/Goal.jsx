import React from "react";

import styles from "./goal.module.scss";

export const Goal = ({ goal }) => {
  return (
    <div className={styles.root}>
      <div className={styles.goalContainer}>
        <span className={styles.goalName}>{goal.name}</span>
        <p>{goal.desc}</p>
        <span className={styles.taskCaption}>Следующие задачи:</span>
        <ul>
          {goal.Tasks.map((task, index) => (
            <li key={index}>{task.name}</li>
          ))}
        </ul>

        <label>
          <progress
            className={styles.progressBar}
            max="100"
            value="70"
          ></progress>
          <span>27/60</span>
        </label>
      </div>

      <div className={styles.rewardContainer}>
        <span>Награда:</span>
        <div
          className={styles.rewardImage}
          style={{
            backgroundImage: `url(${goal.Reward && goal.Reward.imageUrl})`,
          }}
        ></div>
        <span className={styles.rewardName}>
          {goal.Reward && goal.Reward.name}
        </span>
      </div>
    </div>
  );
};
