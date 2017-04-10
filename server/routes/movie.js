var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var MovieSchema = mongoose.Schema({
  title: String,
  year: String,
  actors: String,
  runtime: String,
  plot: String
});

var Movies = mongoose.model('movies', MovieSchema);


router.get('/', function(req, res) {
  Movies.find({}, function(err, allTheMovies) {
    if (err) {
      console.log('Mongo Error: ' + err);
      res.sendStatus(500);
    }
    res.send(allTheMovies);
  });
});


router.post('/', function(req, res) {
  var movie = new Movies ({
    title: req.body.title,
    year: req.body.year,
    actors: req.body.actors,
    runtime: req.body.runtime,
    plot: req.body.plot
  });
  console.log(movie);
  movie.save(function(err, savedMovie) {
        if (err) {
            console.log('Mongo Error:' + err);
            res.sendStatus(500);
        }
        res.send(savedMovie);
    });
});

router.delete('/', function(req, res) {
  var id = req.params.id;
  console.log(id);
  console.log(req.params);

  // Movies.findByIdAndRemove(id, function(err, deletedFav){
  //   if (err) {
  //     console.log(err);
  //     res.sendStatus(500);
  //   }
  //   res.send('deleted: ', deletedFav);
  // });
});


module.exports = router;
