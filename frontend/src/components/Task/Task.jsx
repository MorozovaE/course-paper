import React from "react";
import styles from "./Task.module.scss";
import { useDispatch } from "react-redux";

import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import { selectTask } from "../../store/features/tasksSlice";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";

export const Task = ({ task }) => {
  const priorityClasses = {
    1: "high",
    2: "medium",
    3: "low",
  };

  const dispatch = useDispatch();

  return (
    <div
      className={styles.root}
      onClick={() => {
        dispatch(selectTask(task.id));
      }}
    >
      <div className={styles.taskContainer}>
        <Checkbox data={task} />
        <input type="text" defaultValue={task.name} className={styles.text} />       
      </div>

      <div>
        {task.List == null ? (
          ""
        ) : (
          <span className={styles.category}>{task.List.name}</span>
        )}
        <span className={styles.date}>{convertDateToStr(task.dateTime)}</span>
        {task.Priority !== null ? (
          <PriorityFlagIcon
            className={styles[priorityClasses[task.Priority.id]]}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
