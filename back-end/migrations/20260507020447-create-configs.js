module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Configs", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING,
      },

      phone: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
      },

      whatsApp: {
        type: Sequelize.STRING,
      },

      telegram: {
        type: Sequelize.STRING,
      },

      instagram: {
        type: Sequelize.STRING,
      },

      workHours: {
        type: Sequelize.STRING,
      },

      aboutUs: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("Configs");
  },
};