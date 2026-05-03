const {DataTypes} = require("sequelize")
const db = require("../../db.js")

const Currency=db.define("Currency",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
        require: true
    },
    name: {
        type: DataTypes.STRING,
        require: true,
        unique:true
    },
    symbol: {
        type: DataTypes.STRING,
        require: true,
        unique:true
    },

    
},{timestamps:true})
module.exports=Currency;