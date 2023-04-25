import React from "react";
import styles from "./taskCategory.module.scss";
import { ReactComponent as CategoryIcon } from "../../assets/icons/tasks.svg";
import { taskDataService } from "../../services/task.service";

export const TaskCategory = ({ onChangeValue, defaultValue, type }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [list, setList] = React.useState([]);

  const getList = () => {
    taskDataService.getCategoryList().then((response) => {
      setList(response.data);
    });
  };

  const showList = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  React.useEffect(() => {
    getList();

    const closeDropdown = (e) => {
      setIsOpen(false);
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className={styles.root}>
      {isOpen ? (
        <div className={styles.categoryList}>
          <ul>
            {list.map((obj, i) => (
              <li key={i} onClick={() => onChangeValue(obj["id"])}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.category}></div>
      )}

      {type == "short" && (
        <CategoryIcon
          className={`${styles.categoryIcon} ${
            defaultValue == null ? styles.default : styles.active
          }`}
          onClick={(e) => showList(e)}
        />
      )}

      {type == "long" && (
        <div className={styles.categoryContainer} onClick={(e) => showList(e)}>
          <CategoryIcon />
          <span>{list[defaultValue - 1] && list[defaultValue - 1].name}</span>
        </div>
      )}
    </div>
  );
};
