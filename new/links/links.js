angular.module('link-app').controller('LinksController',[ 'authService', '$http',
function(authService, $http){
    this_ = this;
    url = "http://ozmaxplanet.com:8000/links/"
    headers = {'Authorization': "Token " + authService.auth_token};
    this.getLinks = function(){
        $http.get(url, {'headers': headers}).
            then(function(response){
                this_.links = response.data;
                console.log(response.data);
            },
            function(response){
                console.log(response);
            });
    };
    this.getLinks();
     
}]);

