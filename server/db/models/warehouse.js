const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Warehouse = db.define('Warehouse', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
  },
  state: {
    type: DataTypes.STRING,
  },
});

module.exports = Warehouse;
