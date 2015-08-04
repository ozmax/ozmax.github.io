(function(){
    var app = angular.module('testApp', ['ngRoute']);

    app.config(['$routeProvider', function($routeProvider){
        $routeProvider.
            when('/foo', {
                templateUrl: 'foo.html',
                controller: 'fooController'
            }).
            when('/bar', {
                templateUrl: 'bar.html',
                controller: 'barController'
            }).
            otherwise({
                redirectTo: '/foo.html'
            });
    }]);
    
    app.controller('fooController', function($scope){
        $scope.message = 'you are at foo';
    });

    app.controller('barController', function($scope){
        $scope.message = 'you are at bar';
    });

})();
