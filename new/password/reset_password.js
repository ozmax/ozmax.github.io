angular.module('link-app').controller('resetPasswordController', ['$scope',
'$http', '$location', '$routeParams', '$route', function($scope, $http,
$location, $routeParams, $route){

    uid = $routeParams.uid;
    token = $routeParams.token;
    this.foo = function(){
        data = {
            'uid': uid,
            'token': token,
            'new_password': this.new_password,
            're_new_password': this.re_new_password
        };
        console.log(data);
        url = "http://ozmaxplanet.com:8000/auth/password/reset/confirm/"
        $http.post(url,data).then(function(response){
            console.log(response);
        },function(response){
            console.log(response);
        });
    };
}]);

