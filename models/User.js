// models/User.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class User extends Model {}

User.init({
    discordId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    xp: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    level: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    coins: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;
