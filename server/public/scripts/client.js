var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService) {
  InfoService.getRequest();

  $scope.searchMovie = InfoService.searchMovie;
  $scope.movie = InfoService.movie;


}]);

myApp.controller('TwoController', ['$scope', 'InfoService', function($scope, InfoService) {

}]);




myApp.factory('InfoService', ['$http', function($http) {
    var movie = {
      title: ''
      // year: '',
      // cast: '',
      // genre: '',
    };

    var searchResult = function searchResult(response) {
      console.log('movie title', response);
    };

    return {
        movie: movie,
        getRequest: function() {
            $http.get('/info').then(function(response) {
              console.log(response);
            });
        },

        searchMovie: function(searchInput) {
            searchInput = movie.title;
            console.log(searchInput);
            $http.get('http://www.omdbapi.com/?t=' + searchInput + '&y=&plot=full&r=json').then(function(response) {

              var searchResult = response.data;
              console.log(searchResult);

              console.log(searchResult(response.data));

            });
        },

        searchResult: searchResult
    };


}]);
