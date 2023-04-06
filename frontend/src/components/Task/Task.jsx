import React from "react";
import debounce from "lodash.debounce";

import styles from "./task.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { priorityClasses } from "../../constans";
import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  deleteTask,
  editTask,
  selectTask,
  selectedTaskIdSelector,
} from "../../store/features/tasksSlice";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";

export const Task = ({ task }) => {
  const dispatch = useDispatch();
  const selectedTaskId = useSelector(selectedTaskIdSelector);

  const deleteHandler = async (e) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  const handleChange = debounce((event) => {
    dispatch(
      editTask({ id: selectedTaskId, taskObj: { name: event.target.value } })
    );
  }, 1500);

  return (
    <div
      className={`${styles.root} ${
        selectedTaskId == task.id ? styles.selected : ""
      }`}
      onClick={() => {
        dispatch(selectTask(task.id));
      }}
    >
      <div className={styles.taskContainer}>
        <Checkbox data={task} />
        <input
          type="text"
          defaultValue={task.name}
          onChange={(event) => handleChange(event)}
          className={styles.text}
        />
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
