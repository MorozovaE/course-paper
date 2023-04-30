import React from "react";

import styles from "./createRewardModal.module.scss";

export const CreateRewardModal = ({ active, setActive }) => {
  const [_, setDrag] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState();

  React.useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const dragStartHandler = (e) => {
    e.preventDefault();
    setDrag(true);
  };
  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const onDropHandler = (e) => {
    e.preventDefault();
    let uploadedFile = e.dataTransfer.files[0];

    setFile(uploadedFile);
    setDrag(false);
  };

  const cancelHandler = () => {
    //value from input and textarea
    setActive(false);
    setFile(null);
  };

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
            <textarea
              name=""
              id=""
              cols="30"
              rows="5"
              placeholder="напиши свои мысли о награде..."
            ></textarea>
          </div>

          <div className={styles.modalRewardImgContainer}>
            <h4>Картинка</h4>
            <div
              className={`${styles.dropArea} ${file ? styles.uploaded : ""}`}
              onDragStart={(e) => dragStartHandler(e)}
              onDragEnd={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              {file ? (
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${preview})` }}
                ></div>
              ) : (
                <div>Перетащите или загрузите картинку</div>
              )}
            </div>
          </div>

          <div className={styles.buttonsContainer}>
            <button
              onClick={() => cancelHandler()}
              className={styles.cancelBtn}
            >
              Отмена
            </button>
            <button className={styles.createBtn}>Создать</button>
          </div>
        </div>
      </div>
    </div>
  );
};
