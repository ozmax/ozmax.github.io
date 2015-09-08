
angular.module('link-app').controller('getTokenController', ['$scope', '$http', '$location', 
'$routeParams', '$route', 'authService', function($scope, $http, $location,
$routeParams, $route, authService){
    token = $routeParams.token;
    authService.isAuthenticated = true;
    authService.auth_token = token;
    $location.path('links');

}]);
