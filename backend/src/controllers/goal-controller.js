import { Goal, Reward, Task } from "../db.js";

export const goalController = {};

goalController.getGoals = (req, res, next) => {
  Goal.findAll({ include: [Task, Reward] })
    .then((goals) => {
      res.json(goals);
    })
    .catch(next);
};

goalController.createGoal = (req, res, next) => {
  const body = req.body
  // const body = {
  //   name: "Купить собаку",
  //   RewardId: 1,
  //   tasks: [1, 2] // not for sequiliza "create", but for "addTasks"
  // };

  Goal.create(body, {
    include: [Task],
  })
    .then((goal) => {
      goal.addTasks(body.tasks).then(() => {
        return Goal.findOne({
          where: { id: goal.id },
          include: [Task, Reward],
        }).then((goal) => {
          if (goal) {
            res.json(goal);
          } else {
            res.status(404).send();
          }
        });
      });
    })
    .catch(next);
};

goalController.getGoal = (req, res, next) => {
  res.status(404).send();
};

goalController.editGoal = (req, res, next) => {
  res.status(404).send();
};

goalController.deleteGoal = (req, res, next) => {
  res.status(404).send();
};
