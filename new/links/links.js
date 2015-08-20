angular.module('link-app').controller('LinksController',[ 'authService', '$http',
function(authService, $http){
    this_ = this;
    url = "http://ozmaxplanet.com:8000/links/"
    headers = {'Authorization': "Token " + authService.auth_token};
    this.showForm = true;
    this_ = this;

    //--- dropdown mechs ---
    this.selectedItems = [];
    this.clickItem = function(id){
        pos = this.selectedItems.indexOf(id);
        if (pos > -1) {
            this.selectedItems.splice(pos, 1);
        }
        else{
            this.selectedItems.push(id);
        }
        console.log(this.selectedItems);
    };

    this.isChecked = function(id){
        pos = this.selectedItems.indexOf(id);
        if (pos > -1) {
            return true;
        }
        else{
            return false;
        }
    };

    // --- * ---

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

