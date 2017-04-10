var myApp = angular.module('myApp', []);

myApp.controller('SearchController', ['$scope', 'InfoService', function($scope, InfoService) {
    $scope.searchMovie = InfoService.searchMovie;
    $scope.movie = InfoService.movie;

}]);

myApp.controller('OutputController', ['$scope', 'InfoService', function($scope, InfoService) {
    $scope.searchResult = InfoService.searchResult;
    $scope.saveFavMovie = InfoService.saveMovie;
    console.log(InfoService.favorites.favMovies);

}]);

myApp.controller('FavoritesController', ['$scope', 'InfoService', function($scope, InfoService) {
    $scope.favorites = InfoService.favorites;
    $scope.deleteMovie = InfoService.deleteMovie;
    // InfoService.getRequest();

}]);




myApp.factory('InfoService', ['$http', function($http) {
    var movie = {
        title: ''
    };
    var searchResult = {};
    var favMovies = [];
    var favorites = {};
    var storeMovie = {};


    return {
        movie: movie,
        searchResult: searchResult,
        favorites: favorites,
        favMovies: favMovies,
        storeMovie: storeMovie,

        searchMovie: function() {
            searchMovie = movie.title;
            $http.get('http://www.omdbapi.com/?t=' + searchMovie +
                '&y=&plot=full&r=json').then(function(response) {
                searchResult.response = response.data;

                var newFav = angular.copy(response.data);
                favMovies = newFav;                 //cope the response data and store in favMovies array
                favorites.favMovies = favMovies;    //save the favMovies array inside an object

                movie.title = '';
            });
        },
        getRequest: function() {
            $http.get('/movie').then(function(response) {
              console.log(response);
            });
        },
        saveMovie: function() {
            //store movie info into an object and send to MongoDB via server
            $http.post('/movie', favMovies).then(function(response) {
                console.log(response);
                var savedMovieId = response.data._id;
                console.log(savedMovieId);
            });
        },
        deleteMovie: function(index) {
              //how to access id from obj??
            //     console.log(favMovies._id); //?
            //     movieToDelete = favMovies[index]._id;
            //     console.log(movieToDelete);
            //
            // $http.delete('/movie/' + movieToDelete).then(function(response) {
            //     console.log(response);
            // });
        }





    };

}]);
