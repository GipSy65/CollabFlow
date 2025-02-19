module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high", "urgent"),
      defaultValue: "medium",
      allowNull: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "priority");
  },
};
