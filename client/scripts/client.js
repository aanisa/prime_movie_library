var myApp = angular.module('myApp', []);

myApp.controller('OneController', ['InfoService', function(InfoService) {

}]);

myApp.controller('TwoController', ['$scope', 'InfoService', function($scope, InfoService) {

}]);


myApp.factory('InfoService', ['$http', function($http) {




    return {
    
        getRequest: function() {
            $http.get('/info').then(function(response) {
              console.log(response);
            });
        }
    };


}]);
