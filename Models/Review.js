const sequelize = require("../.config/database");
const DataTypes = require('sequelize');

const Review = sequelize.define("Review", {
    id : {
        type : DataTypes.BIGINT,
        primaryKey : true,
        autoIncrement : true
    },
    restaurant_id : {
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
        defaultValue: true,
        allowNull : false
    },
    customer_id : {
        type: DataTypes.BIGINT,
        allowNull: false
    }
    ,
    createdat : {
        type : DataTypes.DATE,
        allowNull : false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: "reviews",
    timestamps: false
});

module.exports = Review;