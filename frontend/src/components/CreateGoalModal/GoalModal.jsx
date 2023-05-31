import React from "react";

import styles from "./goalModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAllTasks, tasksSelector } from "../../store/features/tasksSlice";
import {
  getAllRewards,
  rewardsSelector,
} from "../../store/features/rewardsSlice";
import { createGoal, goalsSelector } from "../../store/features/goalsSlice";

export const GoalModal = ({ active, setActive }) => {
  const dispatch = useDispatch();
  const goals = useSelector(goalsSelector);
  const tasks = useSelector(tasksSelector);
  const rewards = useSelector(rewardsSelector);
  const [checkedTasks, setCheckedTasks] = React.useState([]);
  const [checkedReward, setCheckedReward] = React.useState(new Number());

  const [goalName, setGoalName] = React.useState("");
  const [goalDesc, setGoalDesc] = React.useState("");

  const uncompletedTasks = tasks.filter((task) => {
    return !task.completed;
  });

  const addGoal = () => {
    dispatch(
      createGoal({
        name: goalName,
        desc: goalDesc,
        tasks: checkedTasks,
        RewardId: checkedReward,
      })
    );

    cancelHandler();
  };

  const handleOnChangeChecked = (taskId) => {
    let index = checkedTasks.indexOf(taskId);
    if (index !== -1) {
      checkedTasks.splice(index, 1);
    } else {
      checkedTasks.push(taskId);
    }
  };

  React.useState(() => {
    dispatch(getAllTasks());
    dispatch(getAllRewards());
  }, []);

  const cancelHandler = () => {
    setActive(false);
    setGoalName("");
    setGoalDesc("");
    setCheckedTasks([]);
    setCheckedReward(new Number());
  };

  return (
    <div
      onClick={() => cancelHandler()}
      className={active ? ` ${styles.modal} ${styles.active}` : styles.modal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={
          active
            ? `${styles.modalContent} ${styles.active}`
            : styles.modalContent
        }
      >
        <div className={styles.modalHeader}>
          <h3>Создание цели</h3>
        </div>

        <form className={styles.modalBody} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.leftContainer}>
            <div className={styles.modalRewardNameContainer}>
              <h4>Название</h4>
              <input
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                type="text"
                placeholder="например, устроиться на работу.."
              />
            </div>
            {/* {!showName && (
            <span className={styles.empty}>*Введите название награды</span>
          )} */}
            <div className={styles.modalRewardDescContainer}>
              <h4>Описание</h4>
              <textarea
                value={goalDesc}
                onChange={(e) => setGoalDesc(e.target.value)}
                cols="30"
                rows="5"
                placeholder="напиши свои мысли о цели..."
              ></textarea>
            </div>
          </div>

          <div className={styles.rightContainer}>
            <div>
              <h4>Выберите задачи:</h4>
              <div className={styles.taskList}>
                {uncompletedTasks.length == 0 ? (
                  <span className={styles.notifiacation}>Нет задач</span>
                ) : (
                  uncompletedTasks.map((task, index) => {
                    return (
                      <li key={index.toString()}>
                        <input
                          type="checkbox"
                          id={`task-checkbox-${index}`}
                          name="task-checkbox"
                          defaultChecked={false}
                          onChange={() => handleOnChangeChecked(task.id)}
                        />
                        <label htmlFor={`task-checkbox-${index}`}>
                          {task.name}
                        </label>
                      </li>
                    );
                  })
                )}
              </div>
            </div>

            <div>
              <h4>Выберите награду:</h4>
              <div className={styles.rewardList}>
                <ul>
                  {rewards.map((reward, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="reward-checkbox"
                        id={`reward-checkbox-${index}`}
                        defaultChecked={false}
                        onChange={() => setCheckedReward(reward.id)}
                      />
                      <label htmlFor={`reward-checkbox-${index}`}>
                        {reward.name}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </form>

        <div className={styles.buttonsContainer}>
          <button onClick={() => cancelHandler()} className={styles.cancelBtn}>
            Отмена
          </button>
          <button onClick={() => addGoal()} className={styles.createBtn}>
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};
