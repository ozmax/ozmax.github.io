angular.module('link-app').controller('LinksController',[ 'authService',
'$http', function(authService, $http){
    this_ = this;
    links_url = "http://ozmaxplanet.com:8000/links/"
    cat_url = "http://ozmaxplanet.com:8000/categories/";
    headers = {
        'Authorization': "Token " + authService.auth_token,
        'Content-Type': 'application/json'
        };
    this_ = this;
    this.showLinkForm = false;
    this.showCatForm = false;
    
    this.swapForm = function(theForm){
        console.log(theForm)
        if (this[theForm] == false){
            this[theForm] = true;
        }    
        else{
            this[theForm] = false;
        }
    };

    //--- dropdown mechs ---
    this.menuOpen = false;
    this.closeMenu = function(){
        this.menuOpen = false;
    };
    this.swapMenu = function(){
        if (this.menuOpen == false ){
            this.menuOpen = true;
        }
        else{
            this.menuOpen = false;
        }
    };

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
    
    this.getCategories = function(){
        headers = {
            'Authorization': "Token " + authService.auth_token,
            };
        $http.get(cat_url, {'headers': headers}).
            then(function(response){
                this_.categories = response.data;
                console.log(response)
            },
            function(response){
                console.log(response)
            
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
    
    this.submitCategory = function(){
        data = {
            'name': this.categoryName
        };
        $http.post(cat_url, data, {'headers': headers}).
            then(function(response){
                console.log(response);
                this_.getCategories();
            },
            function(response){
                console.log(response);
                this_.getCategories();
            });
    };

    this.getLinks();
    this.getCategories(); 
}]);

