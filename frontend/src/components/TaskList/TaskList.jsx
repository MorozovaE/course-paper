import React from "react";
import axios from "axios";

import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { ReactComponent as ClearIcon } from "../../assets/icons/cross.svg";

import Calendar from "../Calendar/Calendar";
import styles from "./taskList.module.scss";
import { TaskPriority } from "../TaskPriority/TaskPriority";
import { TaskCategory } from "../TaskCategory/TaskCategory";
import { Task } from "../Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { convertDateToStr } from "../../utils/convetDateToStr";
import {
  setCategory,
  setDateTime,
  setPriority,
  setTaskName,
} from "../../store/features/tasksSlice";

export const TaskList = () => {
  const dispatch = useDispatch();

  const [items, setItems] = React.useState([]);

  const dateTime = useSelector((state) => state.tasks.dateTime);
  const taskName = useSelector((state) => state.tasks.taskName);
  const priority = useSelector((state) => state.tasks.priority);
  const category = useSelector((state) => state.tasks.category);
  const inputRef = React.useRef();

  const createTask = () => {
    axios
      .post("http://localhost:3001/tasks", {
        name: taskName,
        completed: false,
        dateTime: dateTime,
        priorityId: priority,
        listId: category,
      })
      .then((response) => {
        getTasks();
      });
  };

  const addTask = () => {
    createTask();
    dispatch(setTaskName(""));
    dispatch(setDateTime(null));
    dispatch(setPriority(null));
    dispatch(setCategory(null));
  };

  const onClickClear = () => {
    inputRef.current.focus();
    dispatch(setTaskName(""));
    dispatch(setDateTime(null));
    dispatch(setPriority(null));
    dispatch(setCategory(null));
  };

  const onChangeInput = (event) => {
    dispatch(setTaskName(event.target.value));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  };

  const getTasks = () => {
    axios.get(`http://localhost:3001/tasks`).then((response) => {
      setItems(response.data.reverse());
    });
  };

  React.useEffect(() => {
    getTasks();
  }, [items]);

  return (
    <div className={styles.root}>
      <header>
        <span>Задачи</span>
        <div>
          <SearchIcon />
          <SortIcon />
        </div>
      </header>

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

      <div className={styles.tasksContainer}>
        {items.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
