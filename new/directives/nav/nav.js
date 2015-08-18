angular.module('link-app').directive('navbarElement',['authService', function($scope, authService){
    return{
        restrict: 'E',
        templateUrl: 'directives/nav/nav.html',
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
