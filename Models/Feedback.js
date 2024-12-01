const sequelize = require("../.config/database");
const DataTypes = require('sequelize');

const Feedback = sequelize.define("Feedback", {
    id : {
        type : DataTypes.BIGINT,
        primaryKey : true,
        autoIncrement : true
    },
    reservation_id : {
        type : DataTypes.BIGINT,
        allowNull : false
    },
    rating  : {
        type : DataTypes.INTEGER,
        allowNull : false
    },
    notes : {
        type : DataTypes.STRING,
        allowNull : true
    },
    is_visible : {
        type : DataTypes.BOOLEAN,
        allowNull : false
    }
}, {
    tableName: "feedbacks",
    timestamps: false
});

module.exports = Feedback;