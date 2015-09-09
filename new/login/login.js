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

    // --- Forgot Password Mechs ---
    this.forgotForm = false;
    this.preEmail = true;
    this.finishRequest = false;
    this.swapForgotForm = function(){
        if (this.forgotForm == false){
            this.forgotForm = true;
        }
        else{
            this.forgotForm = false;
        }
    };

    this.submitResetEmail = function(){
        this.preEmail = false;
        this.loading = true;
        var reset_url = "http://ozmaxplanet.com:8000/auth/password/reset/"
        var data = {'email': this.resetEmail};
        $http.post(reset_url, data).then(
            function(response){
                this_.loading = false;
                this_.finishRequestWithSuccess = true
                this_.successEmailMessage = "The recovery link is sent to your inbox!";
            },
            function(response){
                this_.loading = false;
                this_.finishRequestWithFail = true
                this_.failEmailMessage = "Sorry to inform you that something went wrong!";
        });
    };
    this.resetForms = function(){
        this.swapForgotForm();
        this.successEmailMessage = '';
        this.failEmailMessage = '';
        this.preEmail = true;
        this.resetEmail = '';
        this.finishRequestWithSuccess = false;
        this.finishRequestWithFail = false;
    }
    // --- end forgot pass mechs ---

    // google login
    var g_client_id = 'client_id=29062372242-j8bir9ataqad5a1v0u5gsdb1m2sv3jum.apps.googleusercontent.com';
    var g_response_type = 'response_type=code';
    var g_scope ='scope=email';
    var g_redirect = 'redirect_uri=http://ozmaxplanet.com:8000/auth/oauth2/';
    var g_state = 'state=GOOGLE';
    var google_oauth2 = 'https://accounts.google.com/o/oauth2/auth';
    this.google_url =
    google_oauth2+'?'+g_client_id+'&'+g_response_type+'&'+g_scope+'&'+g_redirect+'&'+g_state;
    //

    // facebook login
    var f_client_id = 'client_id=1644968275771867';
    var f_response_type = 'response_type=code';
    var f_scope ='scope=email';
    var f_redirect = 'redirect_uri=http://ozmaxplanet.com:8000/auth/oauth2/';
    var f_state = 'state=FB';
    var facebook_oauth2 = 'https://www.facebook.com/dialog/oauth';
    this.facebook_url =
    facebook_oauth2+'?'+f_client_id+'&'+f_response_type+'&'+f_scope+'&'+f_redirect+'&'+f_state;
    //
}]);
