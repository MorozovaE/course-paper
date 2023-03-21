import React from "react";
import axios from "axios";

import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPriority } from "../../store/features/tasksSlice";
import styles from "./taskPriority.module.scss";

export const TaskPriority = () => {
  const priorityClasses = {
    1: "high",
    2: "medium",
    3: "low",
  };

  const [priorities, setPrioryties] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);


  console.log(priorities);
  const dispatch = useDispatch();
  const priority = useSelector((state) => state.tasks.priority);

  const getPrioryties = () => {
    axios.get(`http://localhost:3001/priorities`).then((response) => {
      setPrioryties(response.data);
    });
  };

  const showPriority = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    getPrioryties();

    const closeDropdown = (e) => {
      setIsOpen(false);
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <>
      {isOpen ? (
        <div className={styles.priorityList}>
          <ul>
            {priorities.map((obj) => (
              <li
                key={obj["id"]}
                className={styles[priorityClasses[obj.id]]}
                onClick={() => dispatch(setPriority(obj["id"]))}
              >
                <PriorityFlagIcon />
                <span>{obj.name}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.priority}></div>
      )}
      <PriorityFlagIcon 
        className={`${styles.defaultPriority} ${
          priority == undefined ? "" : styles[priorityClasses[priority]]
        }`}
        onClick={(e) => showPriority(e)}
      />
    </>
  );
};
