"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Coins", {
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

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable("coinPrices", {
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
      CoinId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Coins",
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

    await queryInterface.createTable("CoinArchives", {
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
      CoinId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Coins",
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
    await queryInterface.dropTable("Coins");
    await queryInterface.dropTable("coinPrices");
    await queryInterface.dropTable("CoinArchives");
  },
};
