const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Item = db.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

module.exports = Item;
