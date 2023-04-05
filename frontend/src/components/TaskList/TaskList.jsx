import React from "react";

import { TaskListHeader } from "../TaskListHeader/TaskListHeader";
import styles from "./taskList.module.scss";
import { Task } from "../Task/Task";
import { TaskInput } from "../TaskInput/TaskInput";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks } from "../../store/features/tasksSlice";

export const TaskList = () => {
  const dispatch = useDispatch();
  
  const items = useSelector((state) => state.tasks.items);

  React.useEffect(() => {
    dispatch(getAllTasks())
  }, [])

  // React.useEffect(() => {
  //   getTasks();
  // }, []);

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
