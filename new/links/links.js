angular.module('link-app').controller('LinksController',[ 'authService',
'$http', function(authService, $http){
    this_ = this;
    base_url = "http://ozmaxplanet.com:8000/";
    links_url = "http://ozmaxplanet.com:8000/links/";
    cat_url = "http://ozmaxplanet.com:8000/categories/";
    headers = {
        'Authorization': "Token " + authService.auth_token,
        'Content-Type': 'application/json'
    };
    this_ = this;
    this.reg_url = 'http://';
    this.showLinkForm = false;
    this.showCatForm = false;

    // --- dropdown mechs ---
    this.menuOpen = false;
    this.selectedCategories = [];
    this.selectedEditCategories = [];

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

    this.clickXCategory = function(X, id){
        pos = this['selected'+X+'Categories'].indexOf(id);
        if (pos > -1) {
            this['selected'+X+'Categories'].splice(pos, 1);
        }
        else{
            this['selected'+X+'Categories'].push(id);
        }
    };

    this.isXChecked = function(X, id){
        pos = this['selected'+X+'Categories'].indexOf(id);
        if (pos > -1) {
            return true;
        }
        else{
            return false;
        }
    };

    this.populateLinkEditDropDown = function(link){
        this.selectedEditCategories = [];
        if (link){
            for (var i=0; i<link.categories.length; i++){
                this.selectedEditCategories.push(link.categories[i].id);
            }
        }
    };
    // --- end dropdown form mechs ---
    
    // --- common functions of link and category ---
    this.linksToDel = [];
    this.categoriesToDel = [];

    this.swapForm = function(theForm){
        if (this[theForm] == false){
            this[theForm] = true;
        }    
        else{
            this[theForm] = false;
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
    };

    this.hasXToDel = function(X){
        if (this[X+'ToDel'].length < 1){
            return false;
        }
        else{
            return true;
        }
    };
    
    this.deleteXItems = function(X){
        ids = this[X+'ToDel'];
        angular.forEach(ids, function(id){
            delete_url = base_url + X + '/' + id + '/';
            $http.delete(delete_url, {'headers': headers})
                .then(function(response){
                    for (var i=0; i<this_[X].length; i++){
                        if (this_[X][i]['id'] == id) {
                            pos = this_[X].indexOf(this_[X][i]);
                            if (pos > -1) {
                                this_[X].splice(pos, 1);
                            }
                        }
                    }
                },
                function(response){
                    console.log(response);
                });
            });
        this.linksToDel = [];
    };
    // --- end common functions for link and category---

    // --- links ---
    this.getLinkById = function(id){
        for (var i=0; i<this.links.length; i++){
            if (this.links[i].id == id){
                return this.links[i];
            }
        } 
    };

    this.getLinks = function(){
        $http.get(links_url, {'headers': headers}).
            then(function(response){
                this_.links = response.data;
            },
            function(response){
                console.log(response);
            });
    };
    
    this.submitLink = function(){
        var data = {
            'url': this.reg_url,
            'categories': this.selectedCategories
        };    
        $http.post(links_url, data, {'headers': headers}).
            then(function(response){
                this_.getLinks();
                this_.getCategories();
                this_.closeAndCleanLinkForm();
            },
            function(response){
                console.log(response);
            });
    };
    this.closeAndCleanLinkForm = function(){
        this.reg_url = '';
        this.selectedCategories = [];
        this.showLinkForm = false;
    };

    this.updateLink = function(id){
        var data = {
            'url': this.updatedUrl,
            'categories': this.selectedEditCategories
        };
        var url = links_url + id + '/';
        $http.put(url, data, {'headers': headers}).
            then(function(response){
                this_.getLinks();
                this_.currentLinkEdit = '';
            },
            function(response){
                console.log(response);
            });
    };
    // --- end links ---
    
    // --- categories ---
    this.getCategoryById = function(id){
        for (var i=0; i<this.categories.length; i++){
            if (this.categories[i].id == id){
                return this.categories[i];
            }
        } 
    };

    this.getCategories = function(){
        headers = {'Authorization': "Token " + authService.auth_token};
        $http.get(cat_url, {'headers': headers}).
            then(function(response){
                this_.categories = response.data;
            },
            function(response){
                console.log(response)
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
            });
    };

    this.updateCategory = function(id){
        data = {'name': this.updatedCategory};
        url = cat_url + id + '/';
        $http.put(url, data, {'headers': headers}).
            then(function(response){
                this_.getCategories();
                this_.getLinks();
                this_.currentCategoryEdit = '';
            },
            function(response){
                console.log(response);
            });
    };

    this.filterCategories = [];
    this.addToFilterCategories = function(id){
        pos = this.filterCategories.indexOf(id);
        if (pos > -1) {
            this.filterCategories.splice(pos, 1);
        }
        else{
            this.filterCategories.push(id);
        }
    };
    // --- end categories ---

    // --- common edit form mechs ---
    this.currentLinkEdit = '';
    this.currentCategoryEdit = '';
    this.swapXEditForm = function(X, id){
        this['current'+X+'Edit'] = id;
        if (X == 'Link' && id){
            var link = this.getLinkById(id)
            this.updatedUrl = link.url;
            this.populateLinkEditDropDown(link);
        }
        if (X == 'Category' && id){
            category = this.getCategoryById(id);
            this.updatedCategory = category.name;
        }
    };
    // --- end edit form mechs ---

    this.getLinks();
    this.getCategories(); 
    this.filterCategory = '';
}]);

angular.module('link-app').filter('chosenCategories', function(){
    return function(items, catIDs){
        if(catIDs.length == 0){
            return items;
        }
        else{
            var filtered = [];
            for(var i=0; i<catIDs.length; i++){
                catId = catIDs[i];
                for (var j=0; j<items.length; j++){
                    item = items[j];
                    for(var k=0; k<item.categories.length; k++){
                        category = item.categories[k];
                        if(category.id == catId){
                            filtered.push(item);
                        }
                    }
                }
            }
            return filtered;
        }
    };
});
