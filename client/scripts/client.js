var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['$scope', 'InfoService', function($scope, InfoService) {
  InfoService.getRequest();
  //func for button to work
  $scope.searchMovie = InfoService.searchMovie;
}]);

myApp.controller('TwoController', ['$scope', 'InfoService', function($scope, InfoService) {

}]);


myApp.factory('InfoService', ['$http', function($http) {

    var movie = {};

    var searchMovie = function() {
      console.log('searching...');
    };


    return {
        searchMovie: searchMovie,

        getRequest: function() {
            $http.get('/info').then(function(response) {
              console.log(response);
            });
        },

        //get movies from OMDB database
        getOMDB: function() {
          var movie = '';
          $http.get('http://www.omdbapi.com/?t=' + movie + '&y=&plot=full&r=json').then(function(response) {
            console.log(response);
          });
        }

    };


}]);
