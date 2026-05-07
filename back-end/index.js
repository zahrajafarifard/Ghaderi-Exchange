const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const sequelize = require("./db.js");
const Coin = require("./models/COIN/coin");
const CurrencyArchive = require("./models/ARCHIVE/currencyArch");
const CoinArchive = require("./models/ARCHIVE/coinArch");
const Currency = require("./models/CURRENCY/currency");
const CoinPrice = require("./models/COIN/coinPrice");
const CurrencyPrice = require("./models/CURRENCY/currencyPrice");

const clientRoutes = require("./routes/client-routes");
const adminRoutes = require("./routes/admin-routes");

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/exhub", express.static(process.cwd() + "/exhub"));

console.log("process.env.VERSION : ", process.env.VERSION);

app.use((req, res, next) => {
  // console.log(req.headers.appversion, req.headers.appversion != undefined);

  if (req.headers.appversion && req.headers.appversion != undefined) {
    if (req.headers.appversion == process.env.VERSION) {
      return next();
    } else {
      return res.status(403).json({ msg: "Exhub has been expired ..." });
    }
  }

  if (req.headers.appversion == undefined) {
    return next();
  }
});

app.use("/api", clientRoutes);
app.use("/admin", adminRoutes);

CurrencyPrice.belongsTo(Currency);

CoinPrice.belongsTo(Coin);
CoinArchive.belongsTo(Coin);
CurrencyArchive.belongsTo(Currency);

sequelize
  .sync()
  // .sync({ force: true })
  .then((result) => {
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
    const io = require("./socket.js").init(server);
    io.on("connection", (socket) => {
      console.log("socket connected ...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
