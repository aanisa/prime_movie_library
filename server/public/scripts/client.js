var myApp = angular.module('myApp', []);

myApp.controller('SearchController', ['$scope', 'InfoService', function($scope, InfoService) {
    $scope.searchMovie = InfoService.searchMovie;
    $scope.movie = InfoService.movie;

}]);

myApp.controller('OutputController', ['$scope', 'InfoService', function($scope, InfoService) {
    $scope.searchResult = InfoService.searchResult;
    $scope.saveFavMovie = InfoService.saveMovie;

}]);

myApp.controller('FavoritesController', ['$scope', 'InfoService', function($scope, InfoService) {
    $scope.favorites = InfoService.favorites;
    $scope.deleteMovie = InfoService.deleteMovie;

    console.log(InfoService.favorites);

    InfoService.getRequest();

}]);




myApp.factory('InfoService', ['$http', function($http) {
    var movie = {
        title: ''
    };
    var searchResult = {};
    var storedMovie = [];
    var favorites = {};
    var favMovies = [];
    var savedMovieId = '';

    return {
        movie: movie,
        searchResult: searchResult,
        favorites: favorites,
        storedMovie: storedMovie,
        favMovies: favMovies,

        searchMovie: function() {
            searchMovie = movie.title;
            $http.get('http://www.omdbapi.com/?t=' + searchMovie +
                '&y=&plot=full&r=json').then(function(response) {
                searchResult.response = response.data;
                //store OMDB response into an array
                storedMovie = angular.copy(response.data);
                //empty title search input field
                movie.title = '';
            });
        },
        getRequest: function() {
            $http.get('/movie').then(function(response) {
              console.log('In DB: ', response);
              //save response in favorites object - to access via $scope and display in DOM
              favMovies = angular.copy(response.data);
              favorites.favMovie = favMovies;
            });
        },

        saveMovie: function() {
            //send storedMovies array to MongoDB via server
            $http.post('/movie', storedMovie).then(function(response) {
              //log all the movies that's saved to the DB
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
