import React from "react";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as CategoryIcon } from "../../assets/icons/category.svg";
import styles from "./taskDetailsHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { priorityClasses } from "../../constans";
import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import { taskSelector } from "../../store/features/tasksSlice";

export const TaskDetailsHeader = () => {
  const task = useSelector(taskSelector);

  return (
    <header className={styles.headerContainer}>
      <div>
        <Checkbox task={task} />
        <div
          className={task.dateTime == null ? styles.defaultDate : styles.date}
        >
          <CalendarIcon />
          <span>{convertDateToStr(task.dateTime)}</span>
        </div>

        {task.Priority ? (
          <div className={styles[priorityClasses[task.Priority.id]]}>
            <PriorityFlagIcon />
            <span>{task.Priority.name}</span>
          </div>
        ) : (
          <div className={styles.defaultPriority}>
            <PriorityFlagIcon className={styles.priority} />
          </div>
        )}

        <div className={styles.category}>
          <CategoryIcon />
          {task.List && <span>{task.List.name}</span>}
        </div>
      </div>
      <BinIcon className={styles.bin} />
    </header>
  );
};
