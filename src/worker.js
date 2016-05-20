/**
 * Created by Assaf on 3/10/2016.
 */
var P = require('autoresolve');
var redis = require(P('src/redis.js'));

exports.saveSensorRecords = function (accountId, compId, record) {
  //TODO validate params here
  console.log(record);
  redis.saveSensorRecords(accountId, compId, record)
};

exports.getSensorRecords = function (accountId, compId) {
  //TODO validate params here
  return redis.getSensorRecords(accountId, compId);
};