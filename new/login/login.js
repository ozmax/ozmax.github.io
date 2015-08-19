angular.module('link-app').controller('LoginController',['authService', '$location', '$cookies', '$http', function(authService, $location, $cookies, $http){
    base_url = "http://ozmaxplanet.com:8000"
    register_url = base_url + '/auth/register/'
    login_url = base_url + "/auth/login/";
    this.notReg = true;
    this.loginUsername = '';
    this.loginPassword = '';
    this_ = this;

    loginFields = ['username', 'password', 'non_field_errors'];
    this.login = function(credentials){
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
                this_.form_error = true;
            });
    };

    this.currentForm = 'loginform';
    this.swapForm = function(){
        if (this.currentForm == 'loginform'){
            this.currentForm = 'registerform';
        }
        else{
            this.currentForm = 'loginform';
        }
    };

    var fieldNames = ['username', 'password', 'email'];
    
    this.swapFormAndNoMessage = function(){
        this.swapForm();
        if (!this.notReg){
            this.notReg = true;
            this.loginUsername = this.reg_username;
            for (var i=0; i<fieldNames.length; i++){
                this['reg_'+fieldNames[i]] = '';
            }
        }
    };
    
    this.submitLogin = function(){
        credentials = {
            'username': this.loginUsername,
            'password': this.loginPassword
        };
        this.login(credentials);
    };
    
    this.register = function(regData){
        $http.post(register_url, regData).
            then(function(response){
                this_.notReg = false;
            },
            function(response){
            for (var i=0; i<fieldNames.length; i++){
                this_['er_reg_'+fieldNames[i]] = '';
            }
                data = response.data;
                for (var i=0; i<fieldNames.length; i++){
                    if (data[fieldNames[i]]){
                        this_['er_reg_'+fieldNames[i]]=data[fieldNames[i]][0];
                    }
                }
            });
    };
    
    this.submitRegister = function(){
        regData = {
            'username': this.reg_username,
            'first_name': this.reg_fname,
            'last_name': this.reg_lname,
            'email': this.reg_email,
            'password': this.reg_password
        };
        this.register(regData);
    };
}]);
