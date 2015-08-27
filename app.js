var app = angular.module('instangularApp', ['ngResource', 'ngRoute', 'ngMap']);

app.config(['$routeProvider',
   function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'templates/home.html',
                controller: 'InstaCtrl'
            }).
            when('/:search', {
                templateUrl: 'templates/search.html',
                controller: 'SearchCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);

app.controller('SearchCtrl', ['$scope', '$routeParams', '$http', 'Insta', function($scope, $routeParams, $http, Insta) {
    var tag = $routeParams.search;

    //using the resource
    Insta.get({tag:tag}, function(response) {
        $scope.photos = response.data;
    });
}]);

app.controller('InstaCtrl', ['$scope', '$http', function($scope, $http) {

    //using http
    $scope.getGrams = function() {
        var tag = $scope.tag.replace(/\s+/g, '');
        var url = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac&callback=JSON_CALLBACK';
        $http.jsonp(url)
            .then(function(response) {
                console.log(response);
                $scope.tag = "";
                $scope.photos = response.data.data;
        });
    };

    $scope.maps = ['San Francisco'];

    $scope.addMap = function() {
        $scope.maps.push($scope.newMap);
    }
    

}]);

app.service('Insta', function($resource) {
    return $resource('https://api.instagram.com/v1/tags/:tag/media/recent?client_id=d8d0d6b44249490bbde6eee4d1968dac',
        {callback: 'JSON_CALLBACK'},
        {get: {method: 'JSONP'}}
    )
});

