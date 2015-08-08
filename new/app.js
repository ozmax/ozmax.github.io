(function(){

var app = angular.module('link-app', ['ngCookies', 'ngRoute']);

app.service('authService', ['$http', '$location', '$cookies', function($http, $location, $cookies){
    base_url = "http://ozmaxplanet.com:8000"
    login_url = base_url + '/auth/login/';
    profile_url = base_url + '/auth/me/'
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
    this.login = function(credentials){
        $http.post(login_url, credentials).
            then(function(response){
                the_service.auth_token = response.data.auth_token;
                $cookies.put('token', the_service.auth_token);
                the_service.isAuthenticated = true;
                $location.path('/links');
            },
            function(response){
                console.log(response);
            });
    };
    this.get_profile = function(){
        headers = {'Authorization': 'Token '+ this.auth_token};
        $http.get(profile_url, {'headers': headers}).
            then(function(response){
                console.log(response);
                return response;
            },
            function(response){
                return response;
            });
    };
    this.logout = function(){
        headers = {'Authorization': 'Token '+ this.auth_token};
        this_service = this;
        $http.post(logout_url,{}, {'headers': headers}).
            then(function(response){
                this_service.auth_token = '';
                this_service.isAuthenticated = false;
                $cookies.remove('token');
                $location.path('/login');
            },
            function(response){
                console.log(response);
            });
    
    };
}]);

app.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService){
    $rootScope.$on('$routeChangeStart', function(event){
        if (authService.isAuthenticated && ($location.path()=='/login')){
            $location.path('/links')
        }
        if (!authService.isAuthenticated){
            $location.path('/login')
        }
    });
}]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/profile', {
            templateUrl: 'templates/profile.html',
            controller: 'ProfileController',
            controllserAs: 'profCtrl'
        }).
        when('/links', {
            templateUrl: 'templates/links.html',
            controller: 'FooController'
        }).
        when('/contacts', {
            templateUrl: 'templates/contacts.html',
            controller: 'FooController'
        }).
        when('/settings', {
            templateUrl: 'templates/settings.html',
            controller: 'FooController'
        }).
        when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        }).
        otherwise({
            redirectTo: '/links'
        });
}]);

app.controller('LoginController',['authService', '$location',  function(authService, $location){
    this.loginUsername = '';
    this.loginPassword = '';
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
        authService.login(credentials);
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
app.controller('ProfileController',['$scope', 'authService', function($scope, authService){
    $scope.authService = authService; 
    token = authService.auth_token;
    data = authService.get_profile();


}]);
app.controller('FooController',[ 'authService', function(authService){
    
}]);

app.directive('navbarElement',['authService', function($scope, authService){
    return{
        restrict: 'E',
        templateUrl: 'templates/nav.html',
        controller: function($scope, $location, authService){
            $scope.authService = authService;
            this.tabItems = {
                'links':    'fa-th', 
                'contacts': 'fa-edit', 
                'profile':  'fa-male', 
                'settings': 'fa-cogs'
            };
            this_ctrl = this;
            $scope.$on('$routeChangeStart', function(){
                this_ctrl.tab = $location.$$path.substring(1);
            });
            var path = $location.$$path.substring(1);
            this.tab = path;
            this.selectTab = function(clickedTab){
                    this.tab = clickedTab;
            };
            this.isSelected = function(checkTab){
                return this.tab == checkTab;
            };
        },
        controllerAs: 'navCtrl'
    };
}]);
})();
