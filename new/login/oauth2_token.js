
angular.module('link-app').controller('getTokenController', ['$scope', '$http', '$location', 
'$routeParams', '$route', '$cookies', 'authService', function($scope, $http, $location,
$routeParams, $route, $cookies, authService){
    token = $routeParams.token;
    authService.isAuthenticated = true;
    authService.auth_token = token;
    $cookies.put('token', token);
    $location.path('links');

}]);
