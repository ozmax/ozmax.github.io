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

    this.linksToDel = [];
    this.catsToDel = [];

    this.hasXToDel = function(X){
        if (this[X+'ToDel'].length < 1){
            return false;
        }
        else{
            return true;
        }
    };

    this.addXToDel = function(X, id){
        pos = this[X+'ToDel'].indexOf(id);
        if (pos > -1) {
            this[X+'ToDel'].splice(pos, 1);
        }
        else{
            this[X+'ToDel'].push(id);
        }
        console.log(this[X+'ToDel'])
    }

    //--- dropdown mechs ---
    this.menuOpen = false;
    this.selectedCategories = [];
    

    this.swapForm = function(theForm){
        if (this[theForm] == false){
            this[theForm] = true;
        }    
        else{
            this[theForm] = false;
        }
    };

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

    this.clickItem = function(id){
        pos = this.selectedCategories.indexOf(id);
        if (pos > -1) {
            this.selectedCategories.splice(pos, 1);
        }
        else{
            this.selectedCategories.push(id);
        }
    };

    this.isChecked = function(id){
        pos = this.selectedCategories.indexOf(id);
        if (pos > -1) {
            return true;
        }
        else{
            return false;
        }
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
            },
            function(response){
                console.log(response)
            
            });
    }

    this.submitLink = function(){
        var data = {
            'url': this.reg_url,
            'categories': this.selectedCategories
        };    
        $http.post(links_url, data, {'headers': headers}).
            then(function(response){
                this_.getLinks();
                this_.closeAndCleanLinkForm();
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
                this_.getCategories();
            },
            function(response){
                console.log(response);
                this_.getCategories();
            });
    };

    this.closeAndCleanLinkForm = function(){
        this.reg_url = '';
        this.selectedCategories = [];
        this.showLinkForm = false;
    }

    this.getLinks();
    this.getCategories(); 
}]);

