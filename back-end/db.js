const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "ghaderi",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
  dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || "3306",
  }
);

module.exports = sequelize;
