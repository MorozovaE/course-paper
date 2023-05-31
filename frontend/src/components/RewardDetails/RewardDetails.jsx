import React from "react";
import debounce from "lodash.debounce";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./rewardDetails.module.scss";
import { ReactComponent as BinIcon } from "../../assets/icons/bin.svg";

import { useDispatch, useSelector } from "react-redux";
import {
  editReward,
  selectedRewardSelector,
  selectedRewardIdSelector,
  getAndSelectReward,
  setSelectedReward,
  rewardsSelector,
  deleteReward,
} from "../../store/features/rewardsSlice";

export const RewardDetails = () => {
  const dispatch = useDispatch();
  const selectedReward = useSelector(selectedRewardSelector);
  const selectedRewardId = useSelector(selectedRewardIdSelector);
  const items = useSelector(rewardsSelector);

  const [rewardName, setRewardName] = React.useState("");
  const [rewardDesc, setRewardDesc] = React.useState("");

  React.useEffect(() => {
    selectedRewardId
      ? dispatch(getAndSelectReward(selectedRewardId))
      : dispatch(setSelectedReward({}));
  }, [selectedRewardId, items]);

  React.useEffect(() => {
    setRewardName(selectedReward.name);
  }, [selectedReward.name]);

  React.useEffect(() => {
    if (selectedRewardId) saveRewardName(selectedRewardId, rewardName);
  }, [rewardName]);

  const saveRewardName = React.useCallback(
    debounce((selectedRewardId, rewardName) => {
      dispatch(
        editReward({ id: selectedRewardId, rewardObj: { name: rewardName } })
      );
    }, 800),
    []
  );

  React.useEffect(() => {
    setRewardDesc(selectedReward.desc);
  }, [selectedReward.desc]);

  React.useEffect(() => {
    if (selectedRewardId) saveRewardDesc(selectedRewardId, rewardDesc);
  }, [rewardDesc]);

  const saveRewardDesc = React.useCallback(
    debounce((selectedRewardId, rewardDesc) => {
      dispatch(
        editReward({ id: selectedRewardId, rewardObj: { desc: rewardDesc } })
      );
    }, 800),
    []
  );

  return (
    <div className={styles.root}>
      {selectedRewardId ? (
        <div className={styles.rewardDetailsContainer}>
          <header>
            <div className={styles.progressbarContainer}>
              <ProgressBar className={styles.progress} now={60} />
              <span className={styles.progressCount}>27/30</span>
            </div>
            <BinIcon
              className={styles.bin}
              onClick={() => dispatch(deleteReward(selectedRewardId))}
            />
          </header>
          <main>
            <div
              className={styles.image}
              style={
                { backgroundImage: `url(${selectedReward.imageUrl})` } || ""
              }
            ></div>

            <input
              placeholder="Введите название награды"
              onChange={(e) => setRewardName(e.target.value)}
              type="text"
              value={rewardName || ""}
            />
            <textarea
              cols="30"
              rows="10"
              value={rewardDesc || ""}
              onChange={(e) => setRewardDesc(e.target.value)}
              placeholder="Описание"
            ></textarea>
          </main>
        </div>
      ) : (
        <div>Нажмите на награду, чтобы увидеть детали</div>
      )}
    </div>
  );
};
