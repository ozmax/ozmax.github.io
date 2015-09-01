angular.module('link-app').controller('resetPasswordController', ['$scope',
'$http', '$location', function($scope, $http, $location){

    this.foo = function(){
    console.log($location.path());
    };
}]);

