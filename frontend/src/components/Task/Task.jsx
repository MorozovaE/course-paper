import React from "react";
import styles from "./task.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import { selectTask } from "../../store/features/tasksSlice";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";
import { http } from "../../http-common";

export const Task = ({ task }) => {
  const dispatch = useDispatch();
  const selectedTaskId = useSelector((state) => state.tasks.id);
  const priorityClasses = {
    1: "high",
    2: "medium",
    3: "low",
  };

  const deleteHandler = async (e) => {
    e.stopPropagation();
    try {
      const response = await http.delete(`/tasks/${task.id}`);

      if (selectedTaskId == response.data.id || task.id == response.data.id) {
        dispatch(selectTask(null));
      }
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
        <BinIcon className={styles.bin} onClick={(e) => deleteHandler(e)} />
      </div>
    </div>
  );
};
