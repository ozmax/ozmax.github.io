angular.module('link-app').controller('ProfileController', ['$scope', '$http', 'authService',
function($scope, $http, authService){
    base_url = "http://ozmaxplanet.com:8000";
    profile_url = base_url + '/auth/me/';
    $scope.authService = authService; 
    token = authService.auth_token;
    this_ = this;
    this.get_profile = function(){
        headers = {'Authorization': 'Token '+ token};
        $http.get(profile_url, {'headers': headers}).
            then(function(response){
                this_.data = response.data
            },
            function(response){
                authService.check_401(response);
            });
    };
    this.get_profile();
}]);

