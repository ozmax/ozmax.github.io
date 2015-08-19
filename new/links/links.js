angular.module('link-app').controller('LinksController',[ 'authService', '$http',
function(authService, $http){
    this_ = this;
    url = "http://ozmaxplanet.com:8000/links/"
    headers = {'Authorization': "Token " + authService.auth_token};
    this.showForm = true;
    this_ = this;

    this.getLinks = function(){
        $http.get(url, {'headers': headers}).
            then(function(response){
                this_.links = response.data;
            },
            function(response){
                console.log(response);
            });
    };
    
    cat_url = "http://ozmaxplanet.com:8000/categories/";
    this.getCategories = function(){
        $http.get(cat_url, {'headers': headers}).
            then(function(response){
                this_.categories = response.data;
            },
            function(response){
            
            });
    }

    this.submitLink = function(){
        data = {
            'url': this.reg_url,
            'categories': this.reg_categories
        };    
        console.log(data);
    };

    this.getLinks();
    this.getCategories(); 
}]);

