var express = require('express');
var createError = require('http-errors');
var router = express.Router();


router.get('/', function(req, res, next) {
    console.log(req.headers)
    res.send({ msg: 'hello', a: '괜찮아' })
  });

module.exports = router;