const sequelize = require("../.config/database");
const DataTypes = require('sequelize');

const Timeslot = sequelize.define("Timeslot", {
    table_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    start :{
        type : DataTypes.TIME,
        allowNull : false
    },
    end_ :{
        type : DataTypes.TIME,
        allowNull: false
    }
}, {
    tableName: "timeslots",
    timestamps: false
});

module.exports = Timeslot;