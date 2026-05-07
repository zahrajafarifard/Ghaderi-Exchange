const { DataTypes } = require("sequelize");
const db = require("../../db.js");

const CurrencyArchive = db.define(
  "CurrencyArchive",
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

module.exports = CurrencyArchive;
