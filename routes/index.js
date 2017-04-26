var express = require('express');
var router = express.Router();

//res变量代表了相应对象 这个相应对象还自带了一些有用的函数   render send json  redirect

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
