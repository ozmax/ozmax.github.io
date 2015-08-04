(function(){

var app = angular.module('link-ap', ['ngRoute']);

app.directive('navbarElement', function(){
    return{
        restrict: 'E',
        templateUrl: 'templates/nav.html',
        controller: function(){
            this.tabItems = ['Auth', 'Links', 'Contacts', 'Settings'];
            this.tab = 1;
            this.selectTab = function(clickedTab){
                this.tab = clickedTab;
            };
            this.isSelected = function(checkTab){
                return this.tab == checkTab;
            };
        },
        controllerAs: 'navCtrl';
    };
});
})();
