export const GoalModel = (sequelize, type) => {
  return sequelize.define("Goal", {
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
  });
};
