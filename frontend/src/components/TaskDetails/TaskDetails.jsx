import React from "react";
import axios from "axios";

import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as CategoryIcon } from "../../assets/icons/category.svg";

import styles from "./taskDetails.module.scss";
import { useSelector } from "react-redux";
import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";

export const TaskDetails = () => {
  const priorityClasses = {
    1: "high",
    2: "medium",
    3: "low",
  };

  const selectedTaskId = useSelector((state) => state.tasks.id);
  const [task, setTask] = React.useState({});

  const getTask = (id) => {
    axios.get(`http://localhost:3001/tasks/${id}`).then((response) => {
      setTask(response.data);
    });
  };

  React.useEffect(() => {
    if (selectedTaskId) {
      getTask(selectedTaskId);
    }
  }, [selectedTaskId]);

  return (
    <div className={styles.root}>
      {!selectedTaskId && <div>Нажмите на задачу!!!</div>}

      {selectedTaskId && (
        <div>
          <header>
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
