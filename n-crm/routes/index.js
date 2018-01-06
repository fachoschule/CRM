var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/views/contactform', function(req, res, next) {
    res.render('contactform');
});

module.exports = router;
