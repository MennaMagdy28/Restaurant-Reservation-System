const sequelize = require("../.config/database");
const DataTypes = require('sequelize');

const User = sequelize.define("User", {
    id : {
        type : DataTypes.BIGINT,
        primaryKey : true,
        autoIncrement : true,
    },
    username : {
        type : DataTypes.STRING,
        allowNull: false
    },
    email: {
        type : DataTypes.STRING,
        unique: true,
        allowNull : false
    },
    password :  {
        type : DataTypes.STRING,
        allowNull: false
    },
    role : {
        type : DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: "users",
    timestamps : false,
    scopes: {
        vendor : {
            where: {role : 'vendor'}
        },
        customer : {
            where : {role : "customer"}
        },
        admin : {
            where : {role : "admin"}
        }
    }
});

module.exports = {User};