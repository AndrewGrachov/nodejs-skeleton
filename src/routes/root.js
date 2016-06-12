var express = require('express');
var router = express.Router();
var onHeaders = require('on-headers');
var dbDriver = require('../../dbDriver');
var debug = require('debug')('app');

var interval = 1; // how often to refresh our measurement
var lag = require('event-loop-lag')(interval);

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

router.use(function (req, res, next) {
  console.time('request');
  onHeaders(res, function () {
    console.log('event loop lag was %d', lag());
    console.timeEnd('request');
  });
  next();
});

router.get('/', function(req, res) {
  res.send('this is home page');
});

router.get('/about', function(req, res) {
  res.send('About all');
});

router.get('/lag', function (req, res) {
  var b = 0;
  debug('before loop');
  for (var i = 0; i < 900000; i++) {
    b += i;
  }
  debug('after loop');
  return res.send({number: b});
});

router.get('/test_mongo', function (req, res) {
  console.time('before_mongo');
  dbDriver.collection('mongo_collection').insert({
    hello: 'world'
  }, function (err, result) {
    console.timeEnd('before_mongo');
    if (err) {
      return next(err);
    }
    return res.send(result);
  });
});

module.exports = router;