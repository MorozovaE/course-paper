import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCategory, categorySelector } from "../../store/features/tasksSlice";
import styles from "./taskCategory.module.scss";
import { ReactComponent as CategoryIcon } from "../../assets/icons/tasks.svg";
import { http } from "../../http-common";

export const TaskCategory = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [list, setList] = React.useState([]);

  const dispatch = useDispatch();
  const category = useSelector(categorySelector);

  const getList = () => {
    http.get("/lists").then((response) => {
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
    <>
      {isOpen ? (
        <div className={styles.categoryList}>
          <ul>
            {list.map((obj, i) => (
              <li key={i} onClick={() => dispatch(setCategory(obj["id"]))}>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className={styles.category}></div>
      )}
      <CategoryIcon
        className={
          category == null ? styles.defaultCategoryIcon : styles.active
        }
        onClick={(e) => showList(e)}
      />
    </>
  );
};
