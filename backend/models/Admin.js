const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Admin = db.define('login', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = login;
