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
        otherwise({
            redirectTo: '/profile'
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
                'profile': 'glyphicon glyphicon-user', 
                'links':  'glyphicon glyphicon-th-list', 
                'contacts': 'glyphicon glyphicon-book', 
                'settings': 'glyphicon glyphicon-wrench'
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
