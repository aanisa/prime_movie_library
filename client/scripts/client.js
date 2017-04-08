var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService) {
  $scope.searchMovie = InfoService.searchMovie;
  $scope.movie = InfoService.movie;

}]);

myApp.controller('TwoController', ['$scope', '$http', 'InfoService', function($scope, $http, InfoService) {
$scope.searchResult = InfoService.searchResult;

InfoService.getRequest();


}]);




myApp.factory('InfoService', ['$http', function($http) {
    var movie = {
      title: ''
      // year: '',
      // cast: '',
      // genre: '',
    };

    var searchResult = {};


    return {
        movie: movie,
        searchResult: searchResult,

        getRequest: function() {
            $http.get('/movie').then(function(response) {
              console.log(response);
            });
        },

        searchMovie: function() {
            searchMovie = movie.title;
            $http.get('http://www.omdbapi.com/?t=' + searchMovie +
                      '&y=&plot=full&r=json').then(function(response) {
              searchResult.response = response.data;
            });
        },

    };


}]);
