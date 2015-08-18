angular.module('link-app').controller('LoginController',['authService', '$location', '$cookies', '$http',
function(authService, $location, $cookies, $http){
    this.loginUsername = '';
    this.loginPassword = '';
    this_ = this;
    login_url = "http://ozmaxplanet.com:8000/auth/login/";
    this.login = function(credentials){
        $http.post(login_url, credentials).
            then(function(response){
                authService.auth_token = response.data.auth_token;
                $cookies.put('token', authService.auth_token);
                authService.isAuthenticated = true;
                $location.path('/links');
            },
            function(response){
                this_.er_password = '';
                this_.er_username = '';
                this_.er_non_field = '';
                data = response.data;
                if (data.username){
                this_.er_username = data.username[0];
                }
                if (data.password){
                this_.er_password = data.password[0];
                }
                if (data.non_field_errors){
                this_.er_non_field = data.non_field_errors[0];
                }
                this_.form_error = true;
            });
    };

    this.currentForm = 'loginform';
    this.swapForm = function(){
        if(this.currentForm == 'loginform'){
            this.currentForm = 'registerform';
        }
        else{
            this.currentForm = 'loginform';
        }
       };
    this.submitLogin = function(){
        credentials = {
            'username': this.loginUsername,
            'password': this.loginPassword
        };
        this.login(credentials);
    };
    this.submitRegister = function(){
        regData = {
            'username': this.regUsername,
            'first_name': this.regFname,
            'last_name': this.regLname,
            'email': this.regEmail,
            'password': this.regPassword
        };
        authService.register(regData);
    };
}]);

