const { Sequelize, DataTypes } = require('sequelize');

function db(dbName, user, pass, host, port) {
        const dataBase = new Sequelize(dbName, user, pass, {
                host, port, dialect: 'mysql'
        });
        return dataBase.define('table', {
                currency: DataTypes.STRING,
                data: DataTypes.JSON
        });
};

module.exports = {
        db,
        source: 'https://min-api.cryptocompare.com/data/pricemultifull?',
        fsyms: ["BTC", "XRP", "ETH", "BCH", "EOS", "LTC", "XMR", "DASH"],
        tsyms: ["USD", "EUR", "GBP", "JPY", "RUR"],
};