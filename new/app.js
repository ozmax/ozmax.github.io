(function(){

var app = angular.module('link-app', ['ngCookies', 'ngRoute']);

app.service('authService', ['$http', '$location', '$cookies', function($http, $location, $cookies){
    base_url = "http://ozmaxplanet.com:8000"
    login_url = base_url + '/auth/login/';
    profile_url = base_url + '/auth/me/'
    this.isAuthenticated = false;
    this.auth_token = '';
    if ($cookies.get('token')){
        this.isAuthenticated = true;
        this.auth_token = $cookies.get('token');
    }
    the_service = this;
    this.login = function(credentials){
        $http.post(login_url, credentials).
            then(function(response){
                auth_token = response.data.auth_token;
                $cookies.put('token', auth_token);
                the_service.isAuthenticated = true;
                $location.path('/links');
            },
            function(response){
                console.log(response)
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
    this.username = '';
    this.password = '';
    this.submit = function(){
        credentials = {
            'username': this.username,
            'password': this.password
        };
        authService.login(credentials);
    };
}]);
app.controller('ProfileController',[ 'authService', function(authService){
    token = authService.auth_token
    console.log(token);
    data = authService.get_profile();
    console.log(data);


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
