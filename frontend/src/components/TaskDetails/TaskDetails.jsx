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
  getAndSelectTask,
  tasksSelector,
  taskSelector,
  selectedTaskIdSelector,
  setSelectedTask,
} from "../../store/features/tasksSlice";
import Calendar from "../Calendar/Calendar";
import { TaskCategory } from "../TaskCategory/TaskCategory";
import { TaskPriority } from "../TaskPriority/TaskPriority";

export const TaskDetails = () => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = React.useState("");

  const selectedTask = useSelector(taskSelector);
  const selectedTaskId = useSelector(selectedTaskIdSelector);
  const items = useSelector(tasksSelector);

  React.useEffect(() => {
    selectedTaskId
      ? dispatch(getAndSelectTask(selectedTaskId))
      : dispatch(setSelectedTask({}));
  }, [selectedTaskId, items]);

  React.useEffect(() => {
    setTaskName(selectedTask.name);
  }, [selectedTask.name]);

  React.useEffect(() => {
    if (selectedTaskId) saveTaskName(selectedTaskId, taskName);
  }, [taskName]);

  const saveTaskName = React.useCallback(
    debounce((selectedTaskId, taskName) => {
      dispatch(editTask({ id: selectedTaskId, taskObj: { name: taskName } }));
    }, 800),
    []
  );

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

  const setTaskDescription = (description) => {
    dispatch(editTask({ id: selectedTaskId, taskObj: { desc: description } }));

    console.log(description);
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
              value={taskName || ""}
              type="text"
              onChange={(event) => setTaskName(event.target.value)}
            />
            <textarea
              rows="40"
              onChange={(event) => setTaskDescription(event.target.value)}
              placeholder="введите описание"
              defaultValue={selectedTask.desc ? selectedTask.desc : ""}
            ></textarea>
          </main>
        </div>
      )}
    </div>
  );
};
