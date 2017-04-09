var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService) {
  $scope.searchMovie = InfoService.searchMovie;
  $scope.movie = InfoService.movie;

}]);

myApp.controller('TwoController', ['$scope', '$http', 'InfoService', function($scope, $http, InfoService) {
$scope.searchResult = InfoService.searchResult;
$scope.saveFavMovie = InfoService.saveMovie;
$scope.favMovies = InfoService.favMovies;
InfoService.getRequest();



}]);




myApp.factory('InfoService', ['$http', function($http) {
    var movie = {
      title: ''
    };

    var searchResult = {};
    var favMovies = [];


    return {
        movie: movie,
        searchResult: searchResult,

        getRequest: function() {
            $http.get('/movie').then(function(response) {
              console.log('In db',  response);
            });
        },

        searchMovie: function() {
            searchMovie = movie.title;
            $http.get('http://www.omdbapi.com/?t=' + searchMovie +
                      '&y=&plot=full&r=json').then(function(response) {
              searchResult.response = response.data;
              movie.title = '';
            });
        },

        saveMovie: function() {
          //store favorite movies in favMovies array
          favMovies.push(searchResult.response);
          console.log(favMovies);
          
          // $http.post('/movie', searchResult.response).then(function(response) {
          //   console.log(searchResult.response);
          //   console.log('saved to db:', response);
          // });
        }

    };


}]);
