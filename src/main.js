/**
 * Created by Assaf on 3/10/2016.
 */
var express = require('express');
var worker = require('./worker.js');
var api = express();
console.log('Started!');

var compState = {};
api.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
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

api.post('/updateRecords/:compId', function(req, res) {
  //var params = JSON.parse(req.params);
  var compId = req.params.compId;
  compState[compId] = JSON.parse(req.body || {});
  //worker.saveSensorRecord(req.body);
  res.end();
});

api.get('/getRecords/:compId', function(req, res) {
  var compId = req.params.compId;
  var isRandom = req.query.isRandom;
  if (!isRandom) {
    var compStatus = compState[compId] || {};
  } else {
    var compStatus = {"ph":random(2, 7),"temp":random(23, 28),"humidity":random(48, 60)}
  }
  res.end(JSON.stringify(compStatus));
});

function random (low, high) {
  return Math.floor((Math.random() * (high - low) + low) * 100) / 100;
}

api.listen(5115);