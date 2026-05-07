"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const coins = [
      { id: 1, name: "سکه تمام قدیم" },
      { id: 2, name: "سکه تصویر امامی" },
      { id: 3, name: "سکه نیم بهار" },
      { id: 4, name: "سکه ربع بهار" },
      { id: 5, name: "سکه یک گرمی" },
      { id: 6, name: "سکه پارسیان" },
    ];

    const coinPrices = coins.map((coin) => ({
      id: coin.id,
      buyPrice: 0,
      sellPrice: 0,
      pBuyPrice: 0,
      pSellPrice: 0,
      CoinId: coin.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const coinArchives = [
      {
        id: 1,
        buyPrice: 0,
        sellPrice: 0,
        CoinId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert(
      "Coins",
      coins.map((coin) => ({
        ...coin,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {
        ignoreDuplicates: true,
      },
    );

    await queryInterface.bulkInsert("coinPrices", coinPrices, {
      ignoreDuplicates: true,
    });

    await queryInterface.bulkInsert("CoinArchives", coinArchives, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Coins", null, {});
    await queryInterface.bulkDelete("coinPrices", null, {});
    await queryInterface.bulkDelete("CoinArchives", null, {});
  },
};