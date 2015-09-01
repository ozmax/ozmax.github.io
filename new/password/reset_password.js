angular.module('link-app').controller('resetPasswordController', ['$scope',
'$http', '$location', '$routeParams', '$route', function($scope, $http,
$location, $routeParams, $route){

    this.foo = function(){
    console.log($routeParams);
    };
}]);

