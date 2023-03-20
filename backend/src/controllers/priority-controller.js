import { Priority } from "../db.js";
import { sqlite3 } from "sqlite3";

conn = sqlite3.Connection(
  {
    name: 'db',
    user: 'liza',
    password: '1234',

    dialect: 'sqlite',
    path: 'db/database.sqlite'
}
)

export const priorityController = {};

priorityController.getPriorities = (req, res, next) => {
  Priority.findAll()
    .then((priorities) => {
      res.json(priorities);
    })
    .catch(next);
};