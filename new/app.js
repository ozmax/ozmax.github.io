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

app.controller('FooController', function($location){
    console.log($location.$$path);

});

app.directive('navbarElement', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/nav.html',
        controller: function(){
            this.tabItems = {
                'Profile': 'glyphicon glyphicon-user', 
                'Links':  'glyphicon glyphicon-th-list', 
                'Contacts': 'glyphicon glyphicon-book', 
                'Settings': 'glyphicon glyphicon-wrench'
            };
            this.tab = 0;
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
