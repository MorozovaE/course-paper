export const PriorityModel = (sequelize, type) => {
  return sequelize.define("Priority", {
    id: {
      type: type.BIGINT(20),
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: type.STRING(20)
    },
    num: {
      type: type.INTEGER
    }
  }, {
    timestamps: false
  });
};