import React from "react";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as ClearIcon } from "../../assets/icons/cross.svg";
import styles from "./taskInput.module.scss";

import Calendar from "../Calendar/Calendar";
import { useDispatch } from "react-redux";
import { TaskPriority } from "../TaskPriority/TaskPriority";
import { TaskCategory } from "../TaskCategory/TaskCategory";
import { convertDateToStr } from "../../utils/convetDateToStr";
import { createTask } from "../../store/features/tasksSlice";

export const TaskInput = () => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = React.useState("");
  const [dateTime, setDateTime] = React.useState(null);
  const [category, setCategory] = React.useState(null);
  const [priority, setPriority] = React.useState(null);

  const inputRef = React.useRef();

  const resetData = () => {
    setTaskName("");
    setDateTime(null);
    setPriority(null);
    setCategory(null);
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
        className={styles.test}
        onKeyDown={handleKeyPress}
        ref={inputRef}
        value={taskName}
        onChange={onChangeInput}
        placeholder="Добавить задачу"
        type="text"
      />

      <div className={styles.inputOptions}>
        {dateTime ? (
          <div className={styles.date}>
            <CalendarIcon />
            <span>{convertDateToStr(dateTime)}</span>
            <Calendar onAccept={(date) => setDateTime(date)} />
          </div>
        ) : (
          <div className={styles.calendarContainer}>
            <CalendarIcon className={styles.calendar} />
            <Calendar onAccept={(date) => setDateTime(date)} />
          </div>
        )}

        <TaskCategory
          onChangeValue={setCategory}
          defaultValue={category}
          type="short"
        />
        <div>
          <TaskPriority onChangeValue={setPriority} defaultValue={priority} type="short" />
        </div>

        <div className={styles.cross}>
          <ClearIcon onClick={onClickClear} />
        </div>
      </div>
    </div>
  );
};
