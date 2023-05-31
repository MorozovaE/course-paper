
export const RewardModel = (sequelize, type) => {
  return sequelize.define("Reward", {
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
    },
    completed: {
      type: type.BOOLEAN,
    },
    imageUrl: {
      type: type.STRING,
    },
  });
};
