import { Sequelize } from "sequelize";
import { config } from "../config.js";

import { TaskModel } from "./models/task.js";
import { PriorityModel } from "./models/priority.js";
import { ListModel } from "./models/list.js";


function oneToMany(one, many, foreignKey) {
  one.hasMany(many,{
    "foreignKey": foreignKey
  })
  many.belongsTo(one,{
    "foreignKey": foreignKey
  })
}

// DB connection
const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    dialect: config.db.dialect,
    storage: config.db.path
  }
);

// models setup
export const Task = TaskModel(sequelize, Sequelize);
export const Priority = PriorityModel(sequelize, Sequelize);
export const List = ListModel(sequelize,Sequelize)

oneToMany(Priority, Task, 'priorityId')
oneToMany(List, Task, 'listId')

// sync
sequelize.sync({force: false}).then(() => {
  console.log("DB synced!");
});
