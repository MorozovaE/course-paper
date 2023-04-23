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

  // controlled input
  const [taskName, setTaskName] = React.useState("");

  const deleteHandler = async (e) => {
    e.stopPropagation();
    dispatch(deleteTask(task.id));
  };

  // on update with new props
  React.useEffect(() => {
    setTaskName(task.name);
  }, [task.name]); // props

  // when user update input
  React.useEffect(() => {
    if (selectedTaskId) saveTaskName(selectedTaskId, taskName);
  }, [taskName]);

  const saveTaskName = React.useCallback(
    debounce((selectedTaskId, taskName) => {
      dispatch(editTask({ id: selectedTaskId, taskObj: { name: taskName } }));
    }, 800),
    []
  );

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
        <Checkbox task={task} />
        <input
          type="text"
          value={taskName} // controlled input
          onChange={(event) => setTaskName(event.target.value)}
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
