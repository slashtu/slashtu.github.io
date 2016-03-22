var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  return res.sendFile( __base+'index.html' );
});

module.exports = router;
