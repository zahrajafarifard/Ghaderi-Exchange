"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const currencies = [
      { id: 1, name: "دلار آمریکا", symbol: "USD" },
      { id: 2, name: "یورو", symbol: "EUR" },
      { id: 3, name: "دلار کانادا", symbol: "CAD" },
      { id: 4, name: "دلار استرالیا", symbol: "AUD" },
      { id: 5, name: "پوند انگلیس", symbol: "GBP" },
      { id: 6, name: "درهم امارات", symbol: "AED" },
      { id: 7, name: "کرون سوئد", symbol: "SEK" },
      { id: 8, name: "کرون نروژ", symbol: "NOK" },
      { id: 9, name: "کرون دانمارک", symbol: "DKK" },
      { id: 10, name: "لیر ترکیه", symbol: "TRY" },
      { id: 11, name: "فرانک سوئیس", symbol: "CHF" },
      { id: 12, name: "ین ژاپن", symbol: "JPY" },
      { id: 13, name: "رینگیت مالزی", symbol: "MYR" },
      { id: 14, name: "یوان چین", symbol: "CNY" },
      { id: 15, name: "دینار عراق", symbol: "IQD" },
      { id: 16, name: "منات آذربایجان", symbol: "AZN" },
    ];

    // =========================
    // CURRENCY PRICES
    // =========================
    const currencyPrices = currencies.map((cur) => ({
      id: cur.id,
      buyPrice: 0,
      sellPrice: 0,
      pBuyPrice: 0,
      pSellPrice: 0,
      CurrencyId: cur.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    // =========================
    // CURRENCY ARCHIVE
    // =========================
    const currencyArchives = [
      {
        id: 1,
        buyPrice: "0",
        sellPrice: "0",
        CurrencyId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // =========================
    // INSERT CURRENCIES
    // =========================
    await queryInterface.bulkInsert(
      "Currencies",
      currencies.map((cur) => ({
        ...cur,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      { ignoreDuplicates: true }
    );

    // =========================
    // INSERT CURRENCY PRICES
    // =========================
    await queryInterface.bulkInsert(
      "currencyPrices",
      currencyPrices,
      { ignoreDuplicates: true }
    );

    // =========================
    // INSERT ARCHIVE
    // =========================
    await queryInterface.bulkInsert(
      "CurrencyArchives",
      currencyArchives,
      { ignoreDuplicates: true }
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("CurrencyArchives", null, {});
    await queryInterface.bulkDelete("currencyPrices", null, {});
    await queryInterface.bulkDelete("Currencies", null, {});
  },
};