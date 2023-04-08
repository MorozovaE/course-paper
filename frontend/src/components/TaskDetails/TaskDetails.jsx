import React from "react";


import styles from "./taskDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";

import {
  getTask,
  tasksSelector,
  selectedTaskIdSelector,
  taskSelector,
  setSelectedTask,
} from "../../store/features/tasksSlice";
import {TaskDetailsHeader} from "../TaskDetailsHeader/TaskDetailsHeader";

export const TaskDetails = () => {
  const dispatch = useDispatch();

  const task = useSelector(taskSelector);
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
          <main>
            <input type="text" defaultValue={task.name} />
            <textarea
              rows="40"
              placeholder="введите описание"
              defaultValue={task.desc ? task.desc : ""}
            ></textarea>
          </main>
        </div>
      )}
    </div>
  );
};
