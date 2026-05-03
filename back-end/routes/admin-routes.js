const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");

router.post("/updateCurrency", adminController.updateCurrency);
router.post("/updateCoin", adminController.updateCoin);
router.get("/getallcoins", adminController.getallcoins);
router.get("/getallcurrencies", adminController.getallcurrencies);
router.post("/registerConfig", adminController.registerConfig);

module.exports = router;
