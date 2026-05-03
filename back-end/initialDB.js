const Coin = require("./models/COIN/coin");
const Currency = require("./models/CURRENCY/currency");
const CoinPrice = require("./models/COIN/coinPrice");


const CurrencyPrice = require("./models/CURRENCY/currencyPrice");
const sequelize = require("./db.js");


module.exports.initialView = async () => {
  try {
    await View.create({});
  } catch {}
};

module.exports.initalCurrency = async () => {
  try {
    await Currency.create({
      name: "دلارآمریکا",
      symbol: "USD",
    });
    await Currency.create({
      name: "یورو",
      symbol: "EUR",
    });
    await Currency.create({
      name: "دلار کانادا",
      symbol: "CAD",
    });
    await Currency.create({
      name: "دلار استرالیا",
      symbol: "AUD",
    });
    await Currency.create({
      name: "پوند انگلیس",
      symbol: "GBP",
    });
    await Currency.create({
      name: "درهم امارات",
      symbol: "AED",
    });
    await Currency.create({
      name: "کرون سوئد",
      symbol: "SEK",
    });
    await Currency.create({
      name: "کرون نروژ",
      symbol: "NOK",
    });
    await Currency.create({
      name: "	کرون دانمارک",
      symbol: "DKK",
    });
    await Currency.create({
      name: "دلار با کارت ملی",
      symbol: "USDC",
    });
    await Currency.create({
      name: "لیر ترکیه",
      symbol: "TRY",
    });
    await Currency.create({
      name: "فرانک سوییس",
      symbol: "CHF",
    });
    await Currency.create({
      name: "ین ژاپن",
      symbol: "JPY",
    });
    await Currency.create({
      name: "	رینگیت مالزی",
      symbol: "MYR",
    });
    await Currency.create({
      name: "	یوان چین",
      symbol: "CNY",
    });
    await Currency.create({
      name: "دینار عراق",
      symbol: "IQD",
    });
    await Currency.create({
      name: "منات آذربایجان",
      symbol: "AZN",
    });
    await Currency.create({
      name: "یورو با کارت ملی",
      symbol: "EURC",
    });
  } catch (err) {
    //  console.log(err);
  }
};

module.exports.initialCoin = async () => {
  try {
    await Coin.create({ name: "سکه تمام قدیم" });
    await Coin.create({ name: "سکه تصویر امامی" });
    await Coin.create({ name: "سکه نیم بهار" });
    await Coin.create({ name: "سکه ربع بهار" });
    await Coin.create({ name: "سکه یک گرمی" });
    await Coin.create({ name: "سکه پارسیان" });
  } catch (err) {
    //  console.log(err);
  }
};



module.exports.initialCoinPrice = async () => {
  try {
    await CoinPrice.create({ CoinId: 1 });
    await CoinPrice.create({ CoinId: 2 });
    await CoinPrice.create({ CoinId: 3 });
    await CoinPrice.create({ CoinId: 4 });
    await CoinPrice.create({ CoinId: 5 });
    await CoinPrice.create({ CoinId: 6 });
  } catch (err) {
    //  console.log(err);
  }
};



module.exports.initialCurrencyPrice = async () => {
  try {
    await CurrencyPrice.create({
      CurrencyId: 1,
    });
    await CurrencyPrice.create({
      CurrencyId: 2,
    });
    await CurrencyPrice.create({
      CurrencyId: 3,
    });
    await CurrencyPrice.create({
      CurrencyId: 4,
    });
    await CurrencyPrice.create({
      CurrencyId: 5,
    });
    await CurrencyPrice.create({
      CurrencyId: 6,
    });
    await CurrencyPrice.create({
      CurrencyId: 7,
    });
    await CurrencyPrice.create({
      CurrencyId: 8,
    });
    await CurrencyPrice.create({
      CurrencyId: 9,
    });
    await CurrencyPrice.create({
      CurrencyId: 10,
    });
    await CurrencyPrice.create({
      CurrencyId: 11,
    });
    await CurrencyPrice.create({
      CurrencyId: 12,
    });
    await CurrencyPrice.create({
      CurrencyId: 13,
    });
    await CurrencyPrice.create({
      CurrencyId: 14,
    });
    await CurrencyPrice.create({
      CurrencyId: 15,
    });
    await CurrencyPrice.create({
      CurrencyId: 16,
    });
    await CurrencyPrice.create({
      CurrencyId: 17,
    });
    await CurrencyPrice.create({
      CurrencyId: 18,
    });
  } catch (err) {
    //console.log(err);
  }
};
