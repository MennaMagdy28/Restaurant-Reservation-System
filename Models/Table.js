const sequelize = require("../.config/database");
const DataTypes = require('sequelize');

const Table = sequelize.define("Table", {
    id : {
        type : DataTypes.BIGINT,
        primaryKey : true,
        autoIncrement : true,
    },
    restaurant_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    seat_num : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
}, {
    tableName: "tables",
    timestamps: false
});

module.exports = Table;