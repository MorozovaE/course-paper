import { Reward } from "../db.js";
import { config } from "../../config.js";

export const rewardController = {};

rewardController.getRewards = (req, res, next) => {
  Reward.findAll({})
    .then((rewards) => {
      res.json(rewards);
    })
    .catch(next);
};

rewardController.createReward = (req, res, next) => {
  const imageUrl = config.app.serverHost + "/image/" + req.file.filename
  Reward.create({ ...req.body, imageUrl })
    .then((reward) => {
      return Reward.findOne({ where: { id: reward.id } });
    })
    .then((reward) => {
      if (reward) {
        res.json(reward);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

rewardController.getReward = (req, res, next) => {
  const id = req.params.rewardId;

  Reward.findOne({ where: { id } })
    .then((rewards) => {
      if (rewards) {
        res.json(rewards);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

rewardController.editReward = (req, res, next) => {
  const newReward = req.body;
  const id = req.params.rewardId;

  Reward.findOne({ where: { id } })
    .then((reward) => {
      if (reward) {
        Object.assign(reward, newReward);

        reward
          .save()
          .then((reward) =>
            Reward.findOne({
              where: { id: reward.id },
            }).then((reward) => {
              if (reward) {
                res.json(reward);
              } else {
                res.status(404).send();
              }
            })
          )
          .catch(next);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

rewardController.deleteReward = (req, res, next) => {
  const id = req.params.rewardId;

  Reward.findOne({ where: { id } })
    .then((reward) => {
      if (reward) {
        reward.destroy().then(res.status(200).send(reward)).catch(next);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};
