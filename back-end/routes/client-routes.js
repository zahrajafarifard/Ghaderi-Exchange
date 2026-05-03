const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client-controller");

router.post("/search", clientController.search);
router.get("/getUSD", clientController.getUSD);
router.get("/featuredCurrencies", clientController.featuredCurrencies);
router.get("/featuredCoins", clientController.featuredCoins);
router.get("/getallcoins", clientController.getallcoins);
router.post("/getCoinPricesForChart", clientController.getCoinPricesForChart);
router.post(
  "/getCurrencyPricesForChart",
  clientController.getCurrencyPricesForChart
);
router.get("/getallcurrencies", clientController.getallcurrencies);
router.get("/getUpdateAtCurrency", clientController.getUpdateAtCurrency);
router.get("/getUpdateAtCoin", clientController.getUpdateAtCoin);
router.get("/getConfig", clientController.getConfig);

module.exports = router;
