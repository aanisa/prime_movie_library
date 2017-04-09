var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService) {
  $scope.searchMovie = InfoService.searchMovie;
  $scope.movie = InfoService.movie;

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


    return {
        movie: movie,
        searchResult: searchResult,
        favorites: favorites,

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
              console.log('In db',  response);
            });
        },

        saveMovie: function() {
          //store favorite movies in favMovies array
          favMovies.push(searchResult.response);
          console.log(favorites);
          console.log(favorites.favMovies);

          // $http.post('/movie', favMovies).then(function(response) {
          //   console.log('saved to db:', response);
          // });
        }

    };


}]);
