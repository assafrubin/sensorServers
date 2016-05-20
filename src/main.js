/**
 * Created by Assaf on 3/10/2016.
 */

var express = require('express');
var P = require('autoresolve');
var config = require(P('config/config')).config;
var worker = require(P('src/worker.js'));
var api = express();
var users = require(P('src/orm/users.js'));
console.log('Environemnt:', config.environment, 'Started!');

var compState = {};

//cors enabling
api.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

api.use(function(req, res, next) {
  var data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    req.body = data;
    next();
  });
});

api.post('/authenticate', function(req, res) {
  var user = JSON.parse(req.body);
  if (typeof user === 'undefined' || !user.displayName || !user.password || !user.password2 || !user.userName) {
    res.statusCode = 401;
    res.send({error: 'one of the items is invalid'});
  }
  if (user.password != user.password2) {
    res.statusCode = 401;
    res.send({error: 'one of the items is invalid'});
  }
  users.registerUser(user.userName, user.displayName, user.password).then(function(user) {
    if (typeof user.error !== 'undefined') {
      res.statusCode = 401;
      res.send({error: user.error});
    } else {
      res.statusCode = 200;
      res.send({user: {id: user.token, name: user.userName}});
    }
  });
});

api.post('/login', function(req, res) {
  var credentials = JSON.parse(req.body);
  if (typeof credentials === 'undefined' || !credentials.userName || !credentials.password) {
    res.statusCode = 401;
    res.send();
  }
  else {
    users.login(credentials.userName, credentials.password).then(function(data) {
      res.statusCode = 200;
      res.send(data);
    });
  }
});

api.post('/updateRecords/:accountId/:compId', function(req, res) {
  //var params = JSON.parse(req.params);
  var accountId = req.params.accountId;
  var compId = req.params.compId;
  //compState[compId] = JSON.parse(req.body || {});
  worker.saveSensorRecords(accountId, compId, JSON.parse(req.body));
  res.end();
});

api.get('/getRecords/:accountId/:compId', function(req, res) {
  var accountId = req.params.accountId;
  var compId = req.params.compId;
  var isRandom = req.query.isRandom;
  if (!isRandom) {
    worker.getSensorRecords(accountId, compId).then(function (result) {
      res.end(JSON.stringify(result));
    });
  } else {
    var compStatus = {"ph":random(2, 7),"temp":random(23, 28),"humidity":random(48, 60)}
    res.end(JSON.stringify(compStatus));
  }
});

function random (low, high) {
  return Math.floor((Math.random() * (high - low) + low) * 100) / 100;
}

api.listen(5115);