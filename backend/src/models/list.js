export const ListModel = (sequelize, type) => {
  return sequelize.define(
    "List",
    {
      id: {
        type: type.BIGINT(20),
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: type.STRING(20),
      },
    },
    {
      timestamps: false,
    }
  );
};
