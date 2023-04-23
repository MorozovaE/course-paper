import React from "react";

import { TaskListHeader } from "../TaskListHeader/TaskListHeader";
import styles from "./taskList.module.scss";
import { Task } from "../Task/Task";
import { TaskInput } from "../TaskInput/TaskInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, tasksSelector } from "../../store/features/tasksSlice";

export const TaskList = () => {
  const dispatch = useDispatch();
  const items = useSelector(tasksSelector);

  React.useEffect(() => {
    dispatch(getAllTasks());
  }, []);

  return (
    <div className={styles.root}>
      <TaskListHeader />
      <TaskInput />

      <div className={styles.tasksContainer}>
        {items.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
