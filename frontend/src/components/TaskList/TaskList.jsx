import React from "react";

import { TaskListHeader } from "../TaskListHeader/TaskListHeader";
import styles from "./taskList.module.scss";
import { Task } from "../Task/Task";
import { TaskInput } from "../TaskInput/TaskInput";
import { useSelector } from "react-redux";

export const TaskList = () => {
  const items = useSelector((state) => state.tasks.items);

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
