(function(){
  var app = angular.module('store', []);

  app.directive('loginForm', function(){
    return{
        restrict: 'E',
        templateUrl: 'login-form.html',
        controller:function($http){
                this.auth_token = ''
                this.submitForm = function(){
                    data = {
                        'username': this.username,
                        'password': this.password
                    }
                    var logger = this;
                    var url = "http://ozmaxplanet.com:8000/auth/login/"
                    $http.post(url, data)
                    .success(function(response){
                        logger.auth_token = response['auth_token']
                    })
                    .error(function(data, status){
                        console.log(data);
                    });
                };
        },
        controllerAs: 'login'
    };
  });

  app.controller('StoreController', function($scope, $http){
    var url = 'http://ozmaxplanet.com:8000/';
        $http.get(url).success(function(response){
        var data = {
            "data": response
        }
        $scope.data = data;
    });
  });

  app.controller('PanelController', function(){
    this.tab = 0;
    this.selectTab = function(tabNum){
        this.tab = tabNum;
    };
    this.isSelected = function(checkTab){
        return this.tab == checkTab;
    };
  });

  })();
