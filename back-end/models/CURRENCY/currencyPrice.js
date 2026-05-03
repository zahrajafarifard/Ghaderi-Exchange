const {DataTypes} = require("sequelize")
const db = require("../../db.js")


const currencyPrice=db.define("currencyPrice",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        require: true
    },
    buyPrice: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    sellPrice: {
        type: DataTypes.INTEGER,
        defaultValue:0
    }
    ,pBuyPrice: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
    pSellPrice: {
        type: DataTypes.INTEGER,
        defaultValue:0,
    }
},{timestamps:true})
module.exports=currencyPrice;