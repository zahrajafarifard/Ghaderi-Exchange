const Coin = require("../models/COIN/coin");
const CurrencyArchive = require("../models/ARCHIVE/currencyArch");
const CoinArchive = require("../models/ARCHIVE/coinArch");
const Currency = require("../models/CURRENCY/currency");
const CoinPrice = require("../models/COIN/coinPrice");
const CurrencyPrice = require("../models/CURRENCY/currencyPrice");
const Config = require("../models/config");
const io = require("../socket");

const net = require("net");
const { converter } = require("javascript-binary-converter");

const adminSecretKey = process.env.ADMIN_SECRET_KEY;

exports.getallcurrencies = async (req, res) => {
  const AllCurrensies = await CurrencyPrice.findAll({
    include: { model: Currency, attributes: ["name", "symbol"] },
    // through: {
    //   attributes: ["name", "symbol"],
    // },
  });

  res.status(200).send(AllCurrensies);
};
exports.getallcoins = async (req, res) => {
  const AllCoins = await CoinPrice.findAll({
    include: { model: Coin, attributes: ["name"] },
    // through: {
    //   attributes: ["name"],
    // },
  });

  res.status(201).send(AllCoins);
};

exports.registerConfig = async (req, res) => {
  // console.log(req.body);
  const {
    address,
    telegram,
    phone,
    email,
    whatsApp,
    instagram,
    workHours,
    aboutUs,
  } = req.body;

  let finded;
  try {
    finded = await Config.findOne();
    if (!finded) {
      await Config.create({
        address,
        telegram,
        phone,
        email,
        whatsApp,
        instagram,
        workHours,
        aboutUs,
      });
    } else {
      await Config.update(
        {
          address,
          telegram,
          phone,
          email,
          whatsApp,
          instagram,
          workHours,
          aboutUs,
        },
        {
          where: {
            id: 1,
          },
        }
      );
    }
    return res.status(200).json({ msg: "registered successfully ..." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "registered failed ..." });
  }
};

exports.updateCurrency = async (req, res) => {
  if (!adminSecretKey || req.headers.secretkey !== adminSecretKey) {
    return res.status(500).json({ err: " req is not valid" });
  }

  let findedCurr;

  let _pBuyPrice;
  let _pSellPrice;
  const body = req.body.currency;

  try {
    for (const currentElement of body) {
      findedCurr = await CurrencyPrice.findOne({
        where: {
          id: currentElement.id,
        },
      });

      if (
        +String(currentElement.buyPrice).replace(/,/g, "") ===
          findedCurr.buyPrice &&
        +String(currentElement.sellPrice).replace(/,/g, "") ===
          findedCurr.sellPrice
      ) {
        console.log("===");
      } else {
        _pBuyPrice = findedCurr.buyPrice;
        _pSellPrice = findedCurr.sellPrice;
        findedCurr.buyPrice = +String(currentElement.buyPrice).replace(
          /,/g,
          ""
        );
        findedCurr.sellPrice = +String(currentElement.sellPrice).replace(
          /,/g,
          ""
        );
        findedCurr.pBuyPrice = _pBuyPrice;
        findedCurr.pSellPrice = _pSellPrice;
        await findedCurr.save();

        await archiveCurrencies(findedCurr);
      }
    }

    const allCurrencies = await CurrencyPrice.findAll({
      include: { model: Currency, attributes: ["name", "symbol"] },
    });

    const currPrices = await CurrencyPrice.findAll({
      attributes: ["id", "buyPrice", "sellPrice"],
      raw: true,
    });
    const coinPrices = await CoinPrice.findAll({
      attributes: ["id", "buyPrice", "sellPrice"],
      raw: true,
    });

    if (coinPrices.length > 1) {
      const first = coinPrices.shift(); // Remove the first item
      coinPrices.push(first); // Add it to the end
    }

    // the order must be sth like this : there are 16 currs ,then 6 coins and next 2 currs ==> totally there are 24 currs and coins for pannel
    //dolaar --- eur --- derham --- china -- liiir --- canada --- pound --- austr
    // tamam bahar -- nim --- rob --- yek gerami

    const currencyOrder = [0, 1, 5, 13, 9, 2, 4, 3];
    const selectedCurrencies = currencyOrder.map((index) => currPrices[index]);
    // Final result: 8 currencies x2, 6 coins, then 2 more currencies
    const allCoinsCurrs = [
      ...selectedCurrencies, // first 8
      ...selectedCurrencies, // next 8
      ...coinPrices, // 6 coins
      selectedCurrencies[6], // extra
      selectedCurrencies[7], // extra
    ];

    await updateTablo(allCoinsCurrs, res);
    ////////////////////////////////////////////////////////////////////////////////////

    io.getio().emit("getCurrencies", allCurrencies);

    io.getio().emit("getFeaturedCurrencies", allCurrencies?.slice(0, 4));

    res.send({ msg: "successfuly" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "server problem" });
  }
};

exports.updateCoin = async (req, res) => {
  if (!adminSecretKey || req.headers.secretkey !== adminSecretKey) {
    return res.status(500).json({ err: " req is not valid" });
  }
  let findedCoin;
  let _pBuyPrice;
  let _pSellPrice;
  const body = req.body.coin;
  try {
    for (const currentElement of body) {
      if (currentElement.id) {
        findedCoin = await CoinPrice.findOne({
          where: {
            id: currentElement.id,
          },
        });
        if (
          +String(currentElement.buyPrice).replace(/,/g, "") ===
            findedCoin.buyPrice &&
          +String(currentElement.sellPrice).replace(/,/g, "") ===
            findedCoin.sellPrice
        ) {
          console.log("===");
        } else {
          _pBuyPrice = findedCoin.buyPrice;
          _pSellPrice = findedCoin.sellPrice;
          findedCoin.buyPrice = +String(currentElement.buyPrice).replace(
            /,/g,
            ""
          );
          findedCoin.sellPrice = +String(currentElement.sellPrice).replace(
            /,/g,
            ""
          );
          findedCoin.pBuyPrice = _pBuyPrice;
          findedCoin.pSellPrice = _pSellPrice;
          await findedCoin.save();
          await archiveCoins(findedCoin);
        }
      }
    }

    ///////////////////////////////////////////////////
    const currPrices = await CurrencyPrice.findAll({
      attributes: ["id", "buyPrice", "sellPrice"],
      raw: true,
    });
    const coinprices = await CoinPrice.findAll({
      attributes: ["id", "buyPrice", "sellPrice"],
      raw: true,
    });

    if (coinprices.length > 1) {
      const first = coinprices.shift(); // Remove the first item
      coinprices.push(first); // Add it to the end
    }

    // the order must be sth like this : there are 16 currs ,then 6 coins and next 2 currs ==> totally there are 24 currs and coins for pannel

    const currencyOrder = [0, 1, 5, 13, 9, 2, 4, 3];
    const selectedCurrencies = currencyOrder.map((index) => currPrices[index]);

    const allCoinsCurrs = [
      ...selectedCurrencies, // first 8
      ...selectedCurrencies, // next 8
      ...coinprices, // 6 coins
      selectedCurrencies[6], // extra
      selectedCurrencies[7], // extra
    ];

    await updateTablo(allCoinsCurrs, res);
    ///////////////////////////////////////////////////

    const coinPrices = await CoinPrice.findAll({
      include: { model: Coin, attributes: ["name"] },
    });
    io.getio().emit("getCoins", coinPrices);
    io.getio().emit("getFeaturedCoins", coinPrices?.slice(0, 4));
    res.send({ msg: "successfuly" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "server problem" });
  }
};

const updateTablo = async (req, res) => {
  console.log("tabooloo:", req);
  var HOST = process.env.TABLO_HOST || "127.0.0.1";
  // var HOST = "192.168.240.241";
  var PORT = Number(process.env.TABLO_PORT || 8080);

  var client = new net.Socket();

  let CRC = 0;
  let send = new Buffer.alloc(1);
  try {
    client.connect(PORT, HOST, async function () {
      console.log("CONNECTED TO :  " + HOST + ":" + PORT);

      send[0] = 127;
      client.write(send);

      CRC = send[0];

      send[0] = 1;
      client.write(send);
      CRC = CRC + send[0];

      send[0] = 13;

      CRC = CRC + send[0];
      client.write(send);

      for (let index = 0; index < 24; index++) {
        for (let indexT = 0; indexT < 2; indexT++) {
          // two cols --- buy and sell
          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 100000000) / 10000000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 100000000) / 10000000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 10000000) / 1000000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 10000000) / 1000000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 1000000) / 100000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 1000000) / 100000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 100000) / 10000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 100000) / 10000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 10000) / 1000 + 48).toInteger()
              : converter(
                  (req[index].sellPrice % 10000) / 1000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);
          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 1000) / 100 + 48).toInteger()
              : converter((req[index].sellPrice % 1000) / 100 + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 100) / 10 + 48).toInteger()
              : converter((req[index].sellPrice % 100) / 10 + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 10) + 48).toInteger()
              : converter((req[index].sellPrice % 10) + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);
        }
      }

      send[0] = converter(CRC % 256).toInteger();

      client.write(send);

      send[0] = converter(CRC / 256).toInteger();

      client.write(send);
    });

    client.on("data", (data) => {
      console.log("data...");
    });
    client.on("error", () => {
      console.log("Error From Server..");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "Failed..." });
  }
};

const archiveCoins = async (coin) => {
  try {
    await CoinArchive.create({
      buyPrice: coin.buyPrice,
      sellPrice: coin.sellPrice,
      CoinId: coin.id,
    });
  } catch (err) {
    console.log(err);
  }
};

const archiveCurrencies = async (currency) => {
  try {
    await CurrencyArchive.create({
      buyPrice: currency.buyPrice,
      sellPrice: currency.sellPrice,
      CurrencyId: currency.id,
    });
  } catch (err) {
    console.log(err);
  }
};
