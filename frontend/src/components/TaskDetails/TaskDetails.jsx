import React from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";

import styles from "./taskDetails.module.scss";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { convertDateToStr } from "../../utils/convetDateToStr";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  deleteTask,
  editTask,
  taskSelector,
} from "../../store/features/tasksSlice";
import {
  getAndSelectTask,
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
      ? dispatch(getAndSelectTask(selectedTaskId))
      : dispatch(setSelectedTask({}));
  }, [selectedTaskId, items]);

  const saveTaskName = debounce((taskName) => {
    dispatch(editTask({ id: selectedTaskId, taskObj: { name: taskName } }));
  }, 1500);

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
              <TaskPriority
                onChangeValue={setPriority}
                defaultValue={selectedTask.priorityId}
                type="long"
              />
            </div>

            <BinIcon
              onClick={() => dispatch(deleteTask(selectedTaskId))}
              className={styles.bin}
            />
          </header>
          <main>
            <input
              defaultValue={selectedTask.name}
              type="text"
              onChange={(event) => saveTaskName(event.target.value)}
            />
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
