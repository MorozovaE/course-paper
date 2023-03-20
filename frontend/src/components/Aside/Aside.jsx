import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./aside.module.scss";
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg";
import { ReactComponent as GoalIcon } from "../../assets/icons/goal.svg";
import { ReactComponent as RewardIcon } from "../../assets/icons/reward.svg";
import { ReactComponent as TasksIcon } from "../../assets/icons/tasks.svg";

import catImg from "../../assets/img/cat.svg";

function getAccountData() {
  // fetch
  return {
    accountPict: catImg,
    firstName: "Елизавета",
    lastName: "Морозова",
  };
}

export const Aside = () => {
  let isActive = ({ isActive }) => (isActive ? styles.active : "");

  let itemsCount = {
    goalCount: 3,
    rewardsCount: 27,
    tasksCount: 137,
  };

  return (
    <div className={styles.root}>
      <div className={styles.infoContainer}>
        <img src={getAccountData().accountPict} alt="" />
        <div className={styles.userInfo}>
          <span className={styles.firstName}>{getAccountData().firstName}</span>
          <span className={styles.lastName}>{getAccountData().lastName}</span>
        </div>
        <span className={styles.edit}>Редактировать</span>
      </div>
      <div className={styles.classificationElementsContainer}>
        <ul>
          <NavLink to="/" className={isActive}>
            <li>
              <HomeIcon />
              <span>Главная</span>
            </li>
          </NavLink>

          <NavLink to="/goals" className={isActive}>
            <li>
              <GoalIcon />
              <span>Цели</span>
              <span className={styles.goalCount}>{itemsCount.goalCount}</span>
            </li>
          </NavLink>

          <NavLink to="/rewards" className={isActive}>
            <li>
              <RewardIcon />
              <span>Награды</span>
              <span className={styles.rewardsCount}>
                {itemsCount.rewardsCount}
              </span>
            </li>
          </NavLink>

          <NavLink to="/tasks" className={isActive}>
            <li>
              <TasksIcon />
              <span>Задачи</span>
              <span className={styles.tasksCount}>{itemsCount.tasksCount}</span>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
};
