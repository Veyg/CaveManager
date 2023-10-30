const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '/ebs-data/bot/cavemanager_db/database.sqlite'
});

module.exports = sequelize;
