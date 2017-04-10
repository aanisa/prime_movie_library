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
    InfoService.getRequest();

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
                console.log(response.data);
                movie.title = '';
            });
        },
        getRequest: function() {
            $http.get('/movie').then(function(response) {
                var newFav = angular.copy(response.data);
                favMovies = response.data;
                favorites.favMovies = favMovies;
            });
        },
        saveMovie: function() {
            //store movie info into an object and send to MongoDB via server
            for (var i = 0; i < favMovies.length; i++) {
                storeMovie = {
                    title: favMovies[i].Title,
                    year: favMovies[i].Year,
                    actors: favMovies[i].Actors,
                    runtime: favMovies[i].Runtime,
                    plot: favMovies[i].Plot,
                };
            }
            $http.post('/movie', storeMovie).then(function(response) {
                console.log(response);
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
