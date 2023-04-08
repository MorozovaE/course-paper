import React from "react";
import styles from "./checkbox.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { editTask } from "../../store/features/tasksSlice";

export const Checkbox = ({ task }) => {
  const dispatch = useDispatch();

  const onChangeCompleted = (e) => {
    e.stopPropagation();
    dispatch(
      editTask({ id: task.id, taskObj: { completed: !task.completed } })
    );
  };

  return (
    <>
      <label onClick={(e) => onChangeCompleted(e)}>
        <input
          checked={Boolean(task.completed)}
          readOnly
          type="checkbox"
          className={styles.checkbox}
        />
        <span className={styles.bubble}></span>
      </label>
    </>
  );
};
