import React from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as ClearIcon } from "../../assets/icons/cross.svg";
import styles from "./taskInput.module.scss";

import Calendar from "../Calendar/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { TaskPriority } from "../TaskPriority/TaskPriority";
import { TaskCategory } from "../TaskCategory/TaskCategory";
import { convertDateToStr } from "../../utils/convetDateToStr";
import {
  setCategory,
  setDateTime,
  setPriority,
  createTask,
  dateTimeSelector,
  categorySelector,
  prioritySelector,
} from "../../store/features/tasksSlice";

export const TaskInput = () => {
  const dispatch = useDispatch();

  const dateTime = useSelector(dateTimeSelector);
  const priority = useSelector(prioritySelector);
  const category = useSelector(categorySelector);

  const [taskName, setTaskName] = React.useState("");
  const inputRef = React.useRef();

  const resetData = () => {
    setTaskName("");
    dispatch(setDateTime(null));
    dispatch(setPriority(null));
    dispatch(setCategory(null));
  };

  const addTask = () => {
    dispatch(
      createTask({
        name: taskName,
        completed: false,
        dateTime: dateTime,
        priorityId: priority,
        listId: category,
      })
    );
    resetData();
  };

  const onClickClear = () => {
    inputRef.current.focus();
    resetData();
  };

  const onChangeInput = (event) => {
    setTaskName(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className={styles.inputContainer}>
      <PlusIcon onClick={addTask} className={styles.plus} fill="#B7C8DB" />
      <input
        onKeyDown={handleKeyPress}
        ref={inputRef}
        value={taskName}
        onChange={onChangeInput}
        placeholder="Добавить задачу"
        type="text"
      />
      {dateTime ? (
        <div className={styles.date}>
          <CalendarIcon />
          <span>{convertDateToStr(dateTime)}</span>
          <Calendar />
        </div>
      ) : (
        <div className={styles.calendarContainer}>
          <CalendarIcon className={styles.calendar} />
          <Calendar />
        </div>
      )}

      <TaskCategory />
      <TaskPriority />
      <ClearIcon onClick={onClickClear} className={styles.cross} />
    </div>
  );
};
