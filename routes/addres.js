var express = require('express');
var router = express.Router();
var AdddresModel=require("../modes/AddresModel");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
