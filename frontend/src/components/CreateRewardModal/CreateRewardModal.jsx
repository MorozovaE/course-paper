import React from "react";

import styles from "./createRewardModal.module.scss";

export const CreateRewardModal = ({ active, setActive }) => {
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={
          active
            ? `${styles.modalContent} ${styles.active}`
            : styles.modalContent
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h3>Создание награды</h3>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalRewardNameContainer}>
            <h4>Название</h4>
            <input
              type="text"
              placeholder="например, IPhone или Galaxy Watch 5"
            />
          </div>

          <div className={styles.modalRewardDescContainer}>
            <h4>Описание</h4>
            <textarea name="" id="" cols="30" rows="5" placeholder="напиши свои мысли о награде..."></textarea>
          </div>

          <div className={styles.modalRewardImgContainer}>
            <h4>Картинка</h4>
            <div>пертащите</div>
          </div>

          <div className={styles.buttonsContainer}>
            <button className={styles.cancelBtn}>Отмена</button>
            <button className={styles.createBtn}>Создать</button>
          </div>
        </div>
      </div>
    </div>
  );
};
