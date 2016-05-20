/**
 * Created by Assaf on 4/12/2016.
 */
var P = require('autoresolve');
var config = require(P('config/config')).config;
var Redis = require("ioredis");
var _ = require('lodash');
var redis = new Redis(config.redis.port, config.redis.host);

//simple concat in the meantime
function makeKey() {
  var result = '';
  _.forEach(arguments, function(arg) {
    result += arg + ':';
  });
  return result.substring(0, result.length - 1);
}

exports.saveSensorRecords = function(accountId, compId, record) {
  var key = makeKey(accountId, compId);
  redis.hmset(key, record);
};

exports.getSensorRecords = function (accountId, compId) {
  var key = makeKey(accountId, compId);
  return redis.hgetall(key);
};