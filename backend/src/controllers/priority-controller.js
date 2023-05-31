import { Priority } from "../db.js";

export const priorityController = {};

priorityController.getPriorities = (req, res, next) => {
  Priority.findAll()
    .then((priorities) => {
      res.json(priorities);
    })
    .catch(next);
};