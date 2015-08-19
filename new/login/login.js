angular.module('link-app').controller('LoginController',['authService', '$location', '$cookies', '$http',
function(authService, $location, $cookies, $http){
    base_url = "http://ozmaxplanet.com:8000";
    register_url = base_url + '/auth/register/';
    login_url = base_url + "/auth/login/";
    this.notReg = true;
    this.loginUsername = '';
    this.loginPassword = '';
    this.currentForm = 'loginform';
    var loginFields = ['username', 'password', 'non_field_errors'];
    var registerFields = ['username', 'password', 'email'];
    this_ = this;

    this.cleanErrors = function(){
        for (var i=0; i<loginFields.length; i++){
            this['er_'+loginFields[i]] = '';
            this['er_reg_'+registerFields[i]] = '';
        }
    };

    this.cleanPassword = function(){
        this.loginPassword = '';
        this.reg_password = '';
    };

    this.swapForm = function(){
        this.cleanErrors();
        this.cleanPassword();
        if (this.currentForm == 'loginform'){
            this.currentForm = 'registerform';
        }
        else{
            this.currentForm = 'loginform';
        }
    };

    this.swapFormAndNoMessage = function(){
        this.swapForm();
        if (!this.notReg){
            this.notReg = true;
            this.loginUsername = this.reg_username;
            for (var i=0; i<registerFields.length; i++){
                this['reg_'+registerFields[i]] = '';
            }
        }
    };

    this.login = function(credentials){
        credentials = {
            'username': this.loginUsername,
            'password': this.loginPassword
        };
        $http.post(login_url, credentials).
            then(function(response){
                authService.auth_token = response.data.auth_token;
                $cookies.put('token', authService.auth_token);
                authService.isAuthenticated = true;
                $location.path('/links');
            },
            function(response){
                data = response.data;
                for (var i=0; i<loginFields.length; i++){
                    this_['er_'+loginFields[i]] = '';
                    if (data[loginFields[i]]){
                        this_['er_'+loginFields[i]] = data[loginFields[i]][0];
                    }
                }
            });
    };

    this.register = function(){
        regData = {
            'username': this.reg_username,
            'first_name': this.reg_fname,
            'last_name': this.reg_lname,
            'email': this.reg_email,
            'password': this.reg_password
        };
        $http.post(register_url, regData).
            then(function(response){
                this_.notReg = false;
            },
            function(response){
            for (var i=0; i<registerFields.length; i++){
                this_['er_reg_'+registerFields[i]] = '';
            }
                data = response.data;
                for (var i=0; i<registerFields.length; i++){
                    if (data[registerFields[i]]){
                        this_['er_reg_'+registerFields[i]]=data[registerFields[i]][0];
                    }
                }
            });
    };
}]);
