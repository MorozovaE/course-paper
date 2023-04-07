import React from "react";

import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as CategoryIcon } from "../../assets/icons/category.svg";

import { priorityClasses } from "../../constans";
import styles from "./taskDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  getTask,
  tasksSelector,
  selectedTaskIdSelector,
} from "../../store/features/tasksSlice";

export const TaskDetails = () => {
  const dispatch = useDispatch();

  const selectedTaskId = useSelector(selectedTaskIdSelector);
  const items = useSelector(tasksSelector);
  //вынести task в redux
  const [task, setTask] = React.useState({});

  //вынести это в fulfield
  React.useEffect(() => {
    if (selectedTaskId) {
      dispatch(getTask(selectedTaskId)).then((data) => {
        setTask(data.payload);
      });
    } else setTask({});
  }, [selectedTaskId, items]);

  return (
    <div className={styles.root}>
      {!selectedTaskId && <div>Нажмите на задачу!!!</div>}

      {selectedTaskId && (
        <div>
          <header className={styles.headerContainer}>
            <div>
              <Checkbox task={task} />
              <div
                className={
                  task.dateTime == null ? styles.defaultDate : styles.date
                }
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
