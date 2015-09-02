angular.module('link-app').controller('resetPasswordController', ['$scope',
'$http', '$location', '$routeParams', '$route', function($scope, $http,
$location, $routeParams, $route){

    uid = $routeParams.uid;
    token = $routeParams.token;
    var this_ = this;
    this.preReset = true;
    passFields = ['new_password', 're_new_password', 'non_field_errors'];

    this.resetPassword = function(){
        this.loading = true;
        data = {
            'uid': uid,
            'token': token,
            'new_password': this.new_password,
            're_new_password': this.re_new_password
        };
        url = "http://ozmaxplanet.com:8000/auth/password/reset/confirm/"
        $http.post(url,data).then(
            function(response){
                this_.preReset = false;
                this_.loading = false;
                this_.message = "Password succesfully changed!"
            }
            ,function(response){
                data = response.data
                console.log(data)
                for (var i=0; i<passFields.length; i++){
                    this_['er_'+passFields[i]] = '';
                    if (data[passFields[i]]){
                        this_['er_'+passFields[i]] = data[passFields[i]][0];
                    }
                }
                console.log(this_)
                this_.preReset = true;
                this_.loading = false;
        });
    };

    this.returnToLogin = function(){
        $location.path('/login')
    };
}]);

