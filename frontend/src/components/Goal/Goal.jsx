import React from "react";

import rewardsImg from "../../assets/img/dog.png";
import styles from "./goal.module.scss";
import { Checkbox } from "../Checkbox/Checkbox";

export const Goal = () => {
  return (
    <div className={styles.root}>
      <div className={styles.goalContainer}>
        <h1>Устроиться на работу</h1>

        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Numquam quam
          rerum qui repellat consequatur doloremque pariatur porro
          exercitationem facilis reprehenderit earum nam rem, laudantium
          cupiditate? Repellendus aliquam accusantium ut quis!
        </p>

        <h2>Следующие задачи:</h2>
        <ul>
          <li>
            <Checkbox />
            <span>Text1</span>
          </li>
          <li>
            <Checkbox />
            <span>Text2</span>
          </li>
          <li>
            <Checkbox />
            <span>Text3</span>
          </li>
        </ul>

        <label >

          <progress className={styles.progressBar} max="100" value="70"></progress>
        </label>
      </div>

      <div className={styles.rewardContainer}>
        <h3>Награда:</h3>
        <img src={rewardsImg} alt="" />
        <span>Купить собаку</span>
      </div>
    </div>
  );
};
