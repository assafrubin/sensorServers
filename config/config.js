/**
 * Created by Assaf on 4/12/2016.
 */
var _ = require('lodash');
var P = require('autoresolve');
var config = {};
var argv = require('minimist')(process.argv.slice(2));
config.environment = argv.environment || 'development';
_.merge(config,
  require(P(_.template('config/environments/${environment}.json')(config))));

exports.config = config;