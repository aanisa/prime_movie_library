var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
  title: String,
  year: String,
  actors: String,
  directors: String,
  runtime: String,
  plot: String
});

var Movie = mongoose.model('movie', MovieSchema, 'movies');


router.get('/', function(req, res) {
  Movie.find({}, function(err, allTheMovies) {
    if (err) {
      console.log('Mongo Error: ' + err);
      res.sendStatus(500);
    }
    res.send(allTheMovies);
  });
});


router.post('/', function(req, res) {
});

router.delete('/', function(req, res) {
});


module.exports = router;
