const sequelize = require("../.config/database");
const DataTypes = require('sequelize');

const Restaurant = sequelize.define("Restaurant", {
    id : {
        type : DataTypes.BIGINT,
        primaryKey : true,
        autoIncrement : true,
    },
    vendor_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },
    food_category : {
        type : DataTypes.STRING,
        allowNull: false
    },
    location : {
        type : DataTypes.STRING,
        allowNull : false
    },
    description : {
        type : DataTypes.STRING
    },
    Image : {
        type : DataTypes.STRING
    }
}, {
    tableName : "restaurants",
    timestamps : false
});

module.exports = Restaurant;