(function(){

var app = angular.module('link-app', ['ngRoute']);
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

app.controller('FooController', function(){

});

app.directive('navbarElement', function($location){
    return{
        restrict: 'E',
        templateUrl: 'templates/nav.html',
        controller: function($location){
            this.tabItems = {
                'links':    'fa-list-ul', 
                'contacts': 'fa-users', 
                'profile':  'fa-user', 
                'settings': 'fa-cog'
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
