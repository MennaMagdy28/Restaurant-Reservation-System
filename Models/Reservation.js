const sequelize = require("../.config/database");
const DataTypes = require('sequelize');

const Reservation = sequelize.define("Reservation", {
    id : {
        type : DataTypes.STRING,
        primaryKey : true,
        autoIncrement : true,
    },
    customer_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    restaurant_id : {
        type : DataTypes.BIGINT,
        allowNull: false
    },
    table_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    date : {
        type : DataTypes.DATEONLY,
    },
    time : {
        type : DataTypes.TIME
    },
},{
    tableName : "reservations",
    timestamp : false
});

module.exports = Reservation;