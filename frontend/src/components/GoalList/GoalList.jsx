import React from "react";

import styles from "./goalList.module.scss";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, tasksSelector } from "../../store/features/tasksSlice";

import { Goal } from "../Goal/Goal";
import { GoalModal } from "../CreateGoalModal/GoalModal";
import { goalDataService } from "../../services/goal.service";
import { getAllGoals, goalsSelector } from "../../store/features/goalsSlice";

export const GoalList = () => {
  const dispatch = useDispatch();

  // const [items, setItems] = React.useState([]);
  const items = useSelector(goalsSelector);
  const [modalActive, setModalActive] = React.useState(false);

  console.log(items);
  // const getGoals = () => {
  //   goalDataService.getAll().then((response) => {
  //     setItems(response.data);
  //   });
  // };

  React.useEffect(() => {
    dispatch(getAllGoals());
    dispatch(getAllTasks());
  }, []);

  return (
    <div className={styles.root}>
      <header>
        <div>
          <span>Цели</span>
          <button
            className={styles.addButn}
            onClick={() => setModalActive(true)}
          >
            <PlusIcon className={styles.plus} />
            Добавить
          </button>
          <GoalModal
            // items={items}
            // setItems={setItems}
            active={modalActive}
            setActive={setModalActive}
          />
        </div>

        <div>
          <SearchIcon />
          <SortIcon />
        </div>
      </header>

      <div className={styles.goalsContainer}>
        {items && items?.map((goal, id) => <Goal key={id} goal={goal} />)}
      </div>
    </div>
  );
};
