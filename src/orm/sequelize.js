/**
 * Created by Assaf on 5/14/2016.
 */
var P = require('autoresolve');
var config = require(P('config/config')).config;
var Sequelize = require('sequelize');
var sequelize = new Sequelize('sensors_dev', config.mysql.username, config.mysql.password, {
  host: config.mysql.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

module.exports = sequelize;