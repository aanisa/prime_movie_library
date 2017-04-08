var express = require('express');
var router = express.Router();
var path = require('path');



// BASE ROUTE
router.get('/', function(req,res){
  console.log('index');
    res.sendFile(path.resolve('server/public/views/index.html'));
});

// 404 HERE (WE WOULD NEED TO ADD IT HERE, BUT WE ARE NOT GOING TO NOW)
//('/*') - catches it all
module.exports = router;
