const { DataTypes } = require("sequelize");
const db = require("../../db.js");

const CoinArchive = db.define(
  "CoinArchive",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    buyPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sellPrice: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true },
);

module.exports = CoinArchive;
