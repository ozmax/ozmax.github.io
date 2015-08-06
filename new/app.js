(function(){



var app = angular.module('link-app', ['ngRoute']);

app.service('authService', function(){
    this.isAuthenticated = false;
});

app.run(['$rootScope', '$location', 'authService', function($rootScope, $location, authService){
    $rootScope.$on('$routeChangeStart', function(event){
        if (!authService.isAuthenticated){
            console.log('not logged');
            $location.path('/login')
        }
    });
}]);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/profile', {
            templateUrl: 'templates/profile.html',
            controller: 'FooController'
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
            controller: 'FooController'
        }).
        otherwise({
            redirectTo: '/links'
        });
}]);

app.controller('FooController',[ 'authService', function(authService){
    console.log(authService.isAuthenticated);

}]);

app.directive('navbarElement', function($location){
    return{
        restrict: 'E',
        templateUrl: 'templates/nav.html',
        controller: function($location){
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
});

})();
