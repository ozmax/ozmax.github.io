angular.module('link-app').controller('LinksController',[ 'authService',
'$http', function(authService, $http){
    this_ = this;
    this.reg_url = "http://foo.gr";
    links_url = "http://ozmaxplanet.com:8000/links/"
    headers = {
        'Authorization': "Token " + authService.auth_token,
        'Content-Type': 'application/json'
        };
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

    this.categoriesToJson = function(){
        categoriesJSON = [];
        for (var i=0; i<this.selectedItems.length; i++){
            categoriesJSON.push(this.selectedItems[i].toString());
        }
        return categoriesJSON;
    };
    // --- * ---

    this.getLinks = function(){
        $http.get(links_url, {'headers': headers}).
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
        categories = this.categoriesToJson();
        var data = {
            'url': this.reg_url,
            'categories': categories
        };    
        $http.post(links_url, data, {'headers': headers}).
            then(function(response){
                console.log(response);
                this_.getLinks();
            },
            function(response){
                console.log(response);
            });
    };

    this.getLinks();
    this.getCategories(); 
}]);

