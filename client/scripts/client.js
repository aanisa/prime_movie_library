var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['InfoService', function(InfoService) {
  InfoService.getRequest();
}]);

myApp.controller('TwoController', ['$scope', 'InfoService', function($scope, InfoService) {

}]);


myApp.factory('InfoService', ['$http', function($http) {

    var movie = {};


    return {

        getRequest: function() {
            $http.get('/info').then(function(response) {
              console.log(response);
            });
        },

        searchMovieDB: function () {
          console.log('searching...');
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
