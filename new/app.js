(function(){
var app = angular.module('link-app', ['ngCookies', 'ngRoute']);
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
        otherwise({
            redirectTo: '/links'
        });
}]);
})();
