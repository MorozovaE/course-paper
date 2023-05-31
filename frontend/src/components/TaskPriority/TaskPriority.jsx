import React from "react";

import { priorityClasses } from "../../constans";
import { ReactComponent as PriorityFlagIcon } from "../../assets/icons/priorityFlag.svg";
import styles from "./taskPriority.module.scss";
import { taskDataService } from "../../services/task.service";

export const TaskPriority = ({ onChangeValue, defaultValue, type }) => {
  const [priorities, setPriorities] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  
  const getPriorities = () => {
    taskDataService.getPriorities().then((response) => {
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
    <div className={styles.root}>
      {isOpen ? (
        <div className={styles.priorityList}>
          <ul>
            {priorities.map((obj) => (
              <li
                key={obj["id"]}
                className={styles[priorityClasses[obj.id]]}
                onClick={() => onChangeValue(obj["id"])}
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

      {type == "short" && (
        <PriorityFlagIcon
          className={`${styles.defaultPriority} ${
            defaultValue == undefined
              ? ""
              : styles[priorityClasses[defaultValue]]
          }`}
          onClick={(e) => showPriority(e)}
        />
      )}

      {type == "long" && (
        <div
          className={
            defaultValue
              ? `${styles.longContainer} ${
                  styles[priorityClasses[defaultValue]]
                }`
              : styles.longDefault
          }
          onClick={(e) => showPriority(e)}
        >
          <PriorityFlagIcon />
          <span>
            {priorities[defaultValue - 1] && priorities[defaultValue - 1].name}{" "}
          </span>
        </div>
      )}
    </div>
  );
};
