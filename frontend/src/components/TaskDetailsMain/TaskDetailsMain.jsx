import React from "react";
import { useSelector } from "react-redux";

import styles from "./taskDetailsMain.module.scss";
import { taskSelector } from "../../store/features/tasksSlice";

export const TaskDetailsMain = () => {
  const task = useSelector(taskSelector);
  return (
    <main>
      <input type="text" defaultValue={task.name} />
      <textarea
        rows="40"
        placeholder="введите описание"
        defaultValue={task.desc ? task.desc : ""}
      ></textarea>
    </main>
  );
};
