"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Currencies", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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

    await queryInterface.createTable("currencyPrices", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      buyPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      sellPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      pBuyPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      pSellPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      // 🔗 RELATION
      CurrencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Currencies",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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

    await queryInterface.createTable("CurrencyArchive", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      buyPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      sellPrice: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      CurrencyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Currencies",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
    await queryInterface.dropTable("Currencies");
    await queryInterface.dropTable("currencyPrices");
    await queryInterface.dropTable("CurrencyArchive");
  },
};
