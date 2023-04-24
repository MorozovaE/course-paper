import React from "react";
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";

import styles from "./rewardList.module.scss";
import { ReactComponent as PlusIcon } from "../../assets/icons/plus.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg";
import { ReactComponent as SortIcon } from "../../assets/icons/sort.svg";
import { ReactComponent as DownloadIcon } from "../../assets/icons/downloadArrow.svg";

import { Reward } from "../Reward/Reward";

export const RewardList = () => {
  const [popupIsOpen, setPopupIsOpen] = React.useState(false);
  const uploader = Uploader({
    apiKey: "free", // Get production API keys from Upload.io
  });

  const addReward = () => {
    setPopupIsOpen(!popupIsOpen);
  };
  return (
    <div className={styles.root}>
      <header>
        <div className={styles.caption}>
          <span>Награды</span>
          <div className={styles.addRewardbBtn} onClick={addReward}>
            <PlusIcon />
            Добавить
          </div>

          {popupIsOpen && (
            <div className={styles.rewardModalWindow}>
              <div className={styles.fillContainer}>
                <input type="text" placeholder="Введите название награды" />

                <UploadButton
                  className={styles.unloadImgButn}
                  uploader={uploader}
                  onComplete={(files) =>
                    console.log(files.map((x) => x.fileUrl).join("\n"))
                  }
                >
                  {({ onClick }) => (
                    <>
                      <button onClick={onClick}>
                        <DownloadIcon /> Загрузить картинку
                      </button>
                    </>
                  )}
                </UploadButton>
              </div>

              <div className={styles.createRewardBtn}>
                <PlusIcon />
               <span>Создать</span> 
              </div>
            </div>
          )}
        </div>

        <div>
          <SearchIcon />
          <SortIcon />
        </div>
      </header>
      <div>
        <Reward />
      </div>
    </div>
  );
};
