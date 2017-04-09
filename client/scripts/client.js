var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService) {
  $scope.searchMovie = InfoService.searchMovie;
  $scope.movie = InfoService.movie;
InfoService.getRequest();
}]);

myApp.controller('TwoController', ['$scope', '$http', 'InfoService', function($scope, $http, InfoService) {
$scope.searchResult = InfoService.searchResult;
$scope.saveFavMovie = InfoService.saveMovie;

$scope.favorites = InfoService.favorites.favMovies;
InfoService.getRequest();
}]);




myApp.factory('InfoService', ['$http', function($http) {
    var movie = {
      title: ''
    };
    //object that will store search result from OMDB
    var searchResult = {};
    //array to store favorite movies, when lick fav button
    var favMovies = [];
    var favorites  = {
      favMovies: favMovies
    };
    var storeMovie = {};

    return {
        movie: movie,
        searchResult: searchResult,
        favorites: favorites,
        favMovies: favMovies,


        searchMovie: function() {
            searchMovie = movie.title;
            $http.get('http://www.omdbapi.com/?t=' + searchMovie +
                      '&y=&plot=full&r=json').then(function(response) {
              searchResult.response = response.data;
              movie.title = '';
            });
        },

        getRequest: function() {
            $http.get('/movie').then(function(response) {
              console.log('In db: ',  response);
            });
        },

        saveMovie: function() {
          var newFav = angular.copy(searchResult.response);
          favMovies.push(newFav);

          //store movie info into an object and send to MongoDB via server
          for (var i = 0; i < favMovies.length; i++) {
          storeMovie = {title:   favMovies[i].Title,
                        year:    favMovies[i].Year,
                        actors:  favMovies[i].Actors,
                        runtime: favMovies[i].Runtime,
                        plot:    favMovies[i].Plot};
            }
            console.log(storeMovie);

          $http.post('/movie', storeMovie).then(function(response) {
            console.log('saved to db:', response);
            getRequest();
          });
      }

    };


}]);
