(function(){
var app = angular.module('link-app', ['ngCookies', 'ngRoute']);
app.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService){
    $rootScope.$on('$routeChangeStart', function(event){
        if ((!authService.isAuthenticated) &&
        ($location.path().indexOf('/get_token') > -1)){
            var path = $location.path();
            $location.path(path);
        }
        else if ((!authService.isAuthenticated) &&
        ($location.path().indexOf('/password/reset') > -1)){
            var path = $location.path();
            $location.path(path);
        }
        else if (authService.isAuthenticated && ($location.path()=='/login')){
            $location.path('/links');
        }
        else if (!authService.isAuthenticated) {
            $location.path('/login')
        }
    });
}]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/profile', {
            templateUrl: 'profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profCtrl'
        }).
        when('/links', {
            templateUrl: 'links/links.html',
            controller: 'LinksController',
            controllerAs: 'lCtrl'
        }).
        when('/contacts', {
            templateUrl: 'contacts/contacts.html',
            controller: 'ContactsController',
            controllerAs: 'cCtrl'
        }).
        when('/settings', {
            templateUrl: 'settings/settings.html'
        }).
        when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        }).
        when('/get_token', {
            templateUrl: 'login/login.html',
            controller: 'getTokenController',
            controllerAs: 'gtCtrl'
        }).
        when('/password/reset/:uid/:token', {
            templateUrl: 'password/reset_password.html',
            controller: 'resetPasswordController',
            controllerAs: 'rCtrl'
        }).
        otherwise({
            redirectTo: '/links'
        });
}]);
})();
