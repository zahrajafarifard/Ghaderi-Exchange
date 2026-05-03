const { Op } = require("sequelize");

const CurrencyArchive = require("../models/ARCHIVE/currencyArch");
const CoinArchive = require("../models/ARCHIVE/coinArch");
const Currency = require("../models/CURRENCY/currency");
const CoinPrice = require("../models/COIN/coinPrice");
const Coin = require("../models/COIN/coin");
const CurrencyPrice = require("../models/CURRENCY/currencyPrice");
const Config = require("../models/config");

exports.getConfig = async (req, res) => {
  let finded;
  try {
    finded = await Config.findOne({
      where: {
        id: 1,
      },
    });
    return res.status(200).send(finded);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "failed fetching data ..." });
  }
};
exports.search = async (req, res) => {
  try {
    const { searchItem } = req.body;

    const [AllCoins, AllCurrs] = await Promise.all([
      CoinPrice.findAll({
        include: {
          model: Coin,
          where: { name: { [Op.like]: `%${searchItem}%` } },
        },
      }),
      CurrencyPrice.findAll({
        include: {
          model: Currency,
          where: {
            [Op.or]: [
              { name: { [Op.like]: `%${searchItem}%` } },
              { symbol: { [Op.like]: `%${searchItem}%` } },
            ],
          },
        },
      }),
    ]);

    if (AllCoins?.length === 0 && AllCurrs?.length === 0) {
      return res.status(404).json({ data: "Not found" });
    }

    return res.status(200).json({ coins: AllCoins, currencies: AllCurrs });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.featuredCoins = async (req, res) => {
  const AllCoins = await CoinPrice.findAll({
    limit: 4,
    include: { model: Coin, attributes: ["name"] },
    // through: {
    //   attributes: ["name"],
    // },
  });
  res.status(200).send(AllCoins);
};
exports.getallcoins = async (req, res) => {
  const AllCoins = await CoinPrice.findAll({
    include: { model: Coin, attributes: ["name"] },
    // through: {
    //   attributes: ["name"],
    // },
  });

  const startOfYesterday = new Date();
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);

  const endOfYesterday = new Date();
  endOfYesterday.setDate(endOfYesterday.getDate() - 1);
  endOfYesterday.setHours(23, 59, 59, 999);

  let percentChanges = [];
  let coins = await CoinPrice.findAll({});

  for (const coin of coins) {
    const firstRecord = await CoinArchive.findOne({
      where: {
        CoinId: coin.id,
        createdAt: {
          [Op.between]: [startOfYesterday, endOfYesterday],
        },
      },
      order: [["createdAt", "ASC"]],
    });

    const lastRecord = await CoinArchive.findOne({
      where: {
        CoinId: coin.id,
        createdAt: {
          [Op.between]: [startOfYesterday, endOfYesterday],
        },
      },
      order: [["createdAt", "DESC"]],
    });

    let percentChangeIn24Hours = 0;
    if (lastRecord?.buyPrice && firstRecord?.sellPrice) {
      percentChangeIn24Hours = (
        ((lastRecord?.buyPrice - firstRecord?.sellPrice) /
          firstRecord?.sellPrice) *
        100
      ).toFixed(2);
    }

    percentChanges.push({
      percentChangeIn24Hours,
    });
  }

  res.status(200).json({
    coins: AllCoins,
    percentChangeIn24Hours: percentChanges,
  });
};

exports.getUSD = async (req, res) => {
  const _data = await CurrencyPrice.findOne({
    include: {
      model: Currency,
      where: { symbol: { [Op.like]: `USD` } },
    },
  });
  res.status(200).send(_data);
};
exports.featuredCurrencies = async (req, res) => {
  const AllCurrensies = await CurrencyPrice.findAll({
    limit: 4,
    include: { model: Currency, attributes: ["name", "symbol"] },
    // through: {
    //   attributes: ["name", "symbol"],
    // },
  });

  res.status(200).send(AllCurrensies);
};

exports.getCoinPricesForChart = async (req, res) => {
  const { id } = req.body;
  let fetchedArchive;
  try {
    fetchedArchive = await CoinArchive.findAll({
      where: {
        CoinId: id,
      },
      order: [["id", "DESC"]],
      limit: 6,
    });

    const sortedArchive = fetchedArchive.sort((a, b) => a.id - b.id);

    res.status(200).json({ data: sortedArchive });
  } catch (error) {
    console.log(error);
  }
};
exports.getCurrencyPricesForChart = async (req, res) => {
  const { id } = req.body;

  let fetchedArchive;
  try {
    fetchedArchive = await CurrencyArchive.findAll({
      where: {
        CurrencyId: id,
      },
      order: [["id", "DESC"]],
      limit: 6,
    });

    const sortedArchive = fetchedArchive.sort((a, b) => a.id - b.id);

    res.status(200).json({ data: sortedArchive });
  } catch (error) {
    console.log(error);
  }
};
exports.getallcurrencies = async (req, res) => {
  const AllCurrensies = await CurrencyPrice.findAll({
    include: { model: Currency, attributes: ["name", "symbol"] },
    // through: {
    //   attributes: ["name", "symbol"],
    // },
  });

  const startOfYesterday = new Date();
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  startOfYesterday.setHours(0, 0, 0, 0);

  const endOfYesterday = new Date();
  endOfYesterday.setDate(endOfYesterday.getDate() - 1);
  endOfYesterday.setHours(23, 59, 59, 999);

  let percentChanges = [];

  try {
    let currencies = await CurrencyPrice.findAll({});

    for (const currency of currencies) {
      const firstRecord = await CurrencyArchive.findOne({
        where: {
          CurrencyId: currency.id,
          createdAt: {
            [Op.between]: [startOfYesterday, endOfYesterday],
          },
        },
        order: [["createdAt", "ASC"]],
      });

      const lastRecord = await CurrencyArchive.findOne({
        where: {
          CurrencyId: currency.id,
          createdAt: {
            [Op.between]: [startOfYesterday, endOfYesterday],
          },
        },
        order: [["createdAt", "DESC"]],
      });

      let percentChangeIn24Hours = 0;
      if (lastRecord?.buyPrice && firstRecord?.sellPrice) {
        percentChangeIn24Hours = (
          ((lastRecord?.buyPrice - firstRecord?.sellPrice) /
            firstRecord?.sellPrice) *
          100
        ).toFixed(2);
      }

      percentChanges.push({
        percentChangeIn24Hours,
      });
    }

    res.status(200).json({
      currs: AllCurrensies,
      percentChangeIn24Hours: percentChanges,
    });
  } catch (error) {
    console.error("Error calculating percentage changes:", error);
  }
};

exports.getUpdateAtCoin = async (req, res) => {
  const updatedAt = await CoinArchive.findOne({
    order: [["updatedAt", "DESC"]],
  });
  res.send(updatedAt);
};
exports.getUpdateAtCurrency = async (req, res) => {
  const updatedAt = await CurrencyArchive.findOne({
    order: [["updatedAt", "DESC"]],
  });
  res.send(updatedAt);
};
