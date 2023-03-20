import { List } from "../db.js";

export const listController = {};

listController.getLists = (req, res, next) => {
  List.findAll()
    .then((lists) => {
      res.json(lists);
    })
    .catch(next);
};