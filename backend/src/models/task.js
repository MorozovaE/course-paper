export const TaskModel = (sequelize, type) => {
  return sequelize.define("Task", {
    id: {
      type: type.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING(256),
      allowNull: true,
    },
    desc: {
      type: type.TEXT,
      allowNull: true,
    },
    completed: {
      type: type.BOOLEAN,
    },
    dateTime: {
      type: type.DATE,
      allowNull: true,
    }
  });
};

// TODO:
// list
// priority
