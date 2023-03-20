import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { setCategory } from "../../store/features/tasksSlice";
import styles from "./taskCategory.module.scss";
import { ReactComponent as CategoryIcon } from "../../assets/icons/tasks.svg";

export const TaskCategory = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [list, setList] = React.useState([]);

  const dispatch = useDispatch();
  const category = useSelector((state) => state.tasks.category);


  const getList = () => {
    axios.get("http://localhost:3001/lists").then((response) => {
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
