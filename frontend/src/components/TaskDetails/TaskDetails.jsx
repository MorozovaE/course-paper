import React from "react";

import styles from "./taskDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  getTask,
  tasksSelector,
  selectedTaskIdSelector,
  setSelectedTask,
} from "../../store/features/tasksSlice";
import { TaskDetailsHeader } from "../TaskDetailsHeader/TaskDetailsHeader";
import { TaskDetailsMain } from "../TaskDetailsMain/TaskDetailsMain";

export const TaskDetails = () => {
  const dispatch = useDispatch();

  const selectedTaskId = useSelector(selectedTaskIdSelector);
  const items = useSelector(tasksSelector);

  React.useEffect(() => {
    selectedTaskId
      ? dispatch(getTask(selectedTaskId))
      : dispatch(setSelectedTask({}));
  }, [selectedTaskId, items]);

  return (
    <div className={styles.root}>
      {!selectedTaskId && <div>Нажмите на задачу!!!</div>}

      {selectedTaskId && (
        <div>
          <TaskDetailsHeader />
          <TaskDetailsMain />
        </div>
      )}
    </div>
  );
};
