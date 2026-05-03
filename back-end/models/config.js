const { DataTypes } = require("sequelize");
const db = require("../db.js");

const Config = db.define("Config", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
    require: true,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  whatsApp: {
    type: DataTypes.STRING,
  },
  telegram: {
    type: DataTypes.STRING,
  },
  instagram: {
    type: DataTypes.STRING,
  },
  workHours: {
    type: DataTypes.STRING,
  },
  aboutUs: {
    type: DataTypes.TEXT,
  },
});
module.exports = Config;
