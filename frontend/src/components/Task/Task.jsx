import React from "react";
import styles from "./task.module.scss";
import { useDispatch } from "react-redux";

import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import { selectTask, setDeletedTaskId } from "../../store/features/tasksSlice";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";
import axios from "axios";

export const Task = ({ task }) => {
  const dispatch = useDispatch();

  const priorityClasses = {
    1: "high",
    2: "medium",
    3: "low",
  };

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/tasks/${task.id}`
      );

      dispatch(setDeletedTaskId(response.data.id));
    } catch (error) {
      console.log(error);
    }
  };

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
        <BinIcon className={styles.bin} onClick={deleteHandler} />
      </div>
    </div>
  );
};
