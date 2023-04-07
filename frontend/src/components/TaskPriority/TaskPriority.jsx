import React from "react";

import { priorityClasses } from "../../constans";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import { useDispatch, useSelector } from "react-redux";
import { setPriority, prioritySelector } from "../../store/features/tasksSlice";
import styles from "./taskPriority.module.scss";
import { http } from "../../http-common";

export const TaskPriority = () => {

  const [priorities, setPriorities] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);

  const dispatch = useDispatch();
  const priority = useSelector(prioritySelector);

  const getPriorities = () => {
    http.get(`/priorities`).then((response) => {
      setPriorities(response.data);
    });
  };

  const showPriority = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    getPriorities();

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
