angular.module('link-app').service('authService', ['$http', '$location',
'$window', '$cookies', function($http, $location, $window, $cookies){
    base_url = "http://ozmaxplanet.com:8000"
    login_url = base_url + '/auth/login/';
    logout_url = base_url + '/auth/logout/'
    register_url = base_url + '/auth/register/'
    this.isAuthenticated = false;
    this.auth_token = '';
    if ($cookies.get('token')){
        this.isAuthenticated = true;
        this.auth_token = $cookies.get('token');
    }
    the_service = this;
    this.register = function(regData){
        $http.post(register_url, regData).
            then(function(response){
                console.log(response);
            },
            function(response){
                console.log(response);
            });
    };
    

    this.check_401 = function(response){
        if (response.status == 401){
            this.auth_token = ''
            this.isAuthenticated = false;
            $location.path('/links');
        }
    };

    
    this.logout = function(){
        headers = {'Authorization': 'Token '+ this.auth_token};
        this_service = this;
        $http.post(logout_url,{}, {'headers': headers}).
            then(function(response){
                this_service.auth_token = '';
                this_service.isAuthenticated = false;
                $cookies.remove('token');
                $window.location = '#/login';
            },
            function(response){
                the_service.check_401(response);
            });
    
    };
}]);

