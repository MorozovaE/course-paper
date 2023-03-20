import { List, Priority, Task } from "../db.js";

export const taskController = {};

taskController.getTasks = (req, res, next) => {
  Task.findAll({ include: [Priority, List] })
    .then((tasks) => {
      res.json(tasks);
    })
    .catch(next);
};

taskController.createTask = (req, res, next) => {
  Task.create(req.body)
    .then((task) => res.json(task))
    .catch(next);
};

taskController.getTask = (req, res, next) => {
  const id = req.params.taskId;

  Task.findOne({ where: { id }, include: [Priority, List] })
    .then((tasks) => {
      if (tasks) {
        res.json(tasks);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

taskController.editTask = (req, res, next) => {
  const newTask = req.body;
  const id = req.params.taskId;

  Task.findOne({ where: { id } })
    .then((task) => {
      if (task) {
        Object.assign(task, newTask);

        task
          .save()
          .then((task) => res.json(task))
          .catch(next);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};

taskController.deleteTask = (req, res, next) => {
  const id = req.params.taskId;

  Task.findOne({ where: { id } })
    .then((task) => {
      if (task) {
        task.destroy().then(res.status(200).send(task)).catch(next);
      } else {
        res.status(404).send();
      }
    })
    .catch(next);
};
