import React from "react";
import styles from "./task.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import { deleteTask, selectTask, selectedTaskIdSelector } from "../../store/features/tasksSlice";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";

export const Task = ({ task }) => {
  const dispatch = useDispatch();
  const selectedTaskId = useSelector(selectedTaskIdSelector)
  const priorityClasses = {
    1: "high",
    2: "medium",
    3: "low",
  };

  const deleteHandler = async (e) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id))
  };

  return (
    <div
      className={`${styles.root} ${selectedTaskId == task.id ? styles.selected : ""}`}
      onClick={() => {
        dispatch(selectTask(task.id));
      }}
    >
      <div className={styles.taskContainer}>
        <Checkbox data={task} />
        <input type="text" defaultValue={task.name} className={styles.text} />
      </div>

      <div className={styles.dataContainer}>
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
        <BinIcon className={styles.bin} onClick={(e) => deleteHandler(e)} />
      </div>
    </div>
  );
};
