var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService) {
  // InfoService.getRequest();

  $scope.searchMovie = InfoService.searchMovie;
  $scope.movie = InfoService.movie;

}]);

myApp.controller('TwoController', ['$scope', 'InfoService', function($scope, InfoService) {
$scope.searchResult = InfoService.searchResult;
console.log($scope.searchResult);

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
        // getRequest: function() {
        //     $http.get('/info').then(function(response) {
        //       console.log(response);
        //     });
        // },

        searchMovie: function() {
            searchMovie = movie.title;
            $http.get('http://www.omdbapi.com/?t=' + searchMovie +
                      '&y=&plot=full&r=json').then(function(response) {
              searchResult.response = response.data;
              // console.log(searchResult.response);
            });
        },

    };


}]);
