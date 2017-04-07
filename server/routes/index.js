var express = require('express');
var router = express.Router();
var path = require('path');


router.get('/info', function(req,res){
    res.send('Get ready, get set, Movie!');
});


// BASE ROUTE
router.get('/', function(req,res){
    res.sendFile(path.resolve('server/public/views/index.html'));
});

// 404 HERE (WE WOULD NEED TO ADD IT HERE, BUT WE ARE NOT GOING TO NOW)
//('/*') - catches it all
module.exports = router;
