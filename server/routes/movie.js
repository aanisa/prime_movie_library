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

var Movie = mongoose.model('Movie', MovieSchema, 'movies');


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
  var movie = new Movie ({
    title: req.body.title,
    year: req.body.year,
    actors: req.body.actors,
    directors: req.body.directors,
    runtime: req.body.runtime,
    plot: req.body.plot
  });
  res.send(req.body);
});

router.delete('/', function(req, res) {
});


module.exports = router;
