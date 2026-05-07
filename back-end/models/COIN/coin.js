const { DataTypes } = require("sequelize");
const db = require("../../db.js");

const Coin = db.define(
  "Coin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { timestamps: true },
);
module.exports = Coin;
