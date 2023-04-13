import React from "react";

import styles from "./taskDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";

import { priorityClasses } from "../../constans";
import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import { editTask, taskSelector } from "../../store/features/tasksSlice";
import {
  getTask,
  tasksSelector,
  selectedTaskIdSelector,
  setSelectedTask,
} from "../../store/features/tasksSlice";
import Calendar from "../Calendar/Calendar";
import { TaskCategory } from "../TaskCategory/TaskCategory";
import { TaskPriority } from "../TaskPriority/TaskPriority";

export const TaskDetails = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(taskSelector);
  const selectedTaskId = useSelector(selectedTaskIdSelector);
  const items = useSelector(tasksSelector);

  React.useEffect(() => {
    selectedTaskId
      ? dispatch(getTask(selectedTaskId))
      : dispatch(setSelectedTask({}));
  }, [selectedTaskId, items]);

  const setDate = (date) => {
    dispatch(editTask({ id: selectedTask.id, taskObj: { dateTime: date } }));
  };

  const setCategory = (listId) => {
    dispatch(editTask({ id: selectedTask.id, taskObj: { listId: listId } }));
  };
  const setPriority = (priorityId) => {
    dispatch(
      editTask({ id: selectedTask.id, taskObj: { priorityId: priorityId } })
    );
  };
  return (
    <div className={styles.root}>
      {!selectedTaskId && <div>Нажмите на задачу!!!</div>}

      {selectedTaskId && (
        <div>
          <header className={styles.headerContainer}>
            <div>
              <Checkbox task={selectedTask} />
              <div
                className={
                  selectedTask.dateTime == null
                    ? styles.defaultDate
                    : styles.date
                }
              >
                <Calendar onAccept={(date) => setDate(date)} />
                <CalendarIcon />
                <span>{convertDateToStr(selectedTask.dateTime)}</span>
              </div>

              <TaskCategory
                onChangeValue={setCategory}
                defaultValue={selectedTask.listId}
                type="long"
              />

              {/* {selectedTask.Priority ? (
                <div
                  className={styles[priorityClasses[selectedTask.Priority.id]]}
                >
                  <PriorityFlagIcon />
                  <span>{selectedTask.Priority.name}</span>
                </div>
              ) : (
                <div className={styles.defaultPriority}>
                  <PriorityFlagIcon className={styles.priority} />
                </div>
              )} */}
              <TaskPriority
                onChangeValue={setPriority}
                defaultValue={selectedTask.priorityId}
                type="long"
              />
            </div>

            <BinIcon className={styles.bin} />
          </header>
          <main>
            <input type="text" defaultValue={selectedTask.name} />
            <textarea
              rows="40"
              placeholder="введите описание"
              defaultValue={selectedTask.desc ? selectedTask.desc : ""}
            ></textarea>
          </main>
        </div>
      )}
    </div>
  );
};
