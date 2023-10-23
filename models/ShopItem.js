// models/ShopItem.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class ShopItem extends Model {}

ShopItem.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: DataTypes.STRING,
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'shopItem'
});

module.exports = ShopItem;
