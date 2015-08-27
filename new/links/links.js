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
    this.reg_url = 'http://foo.delete'
    this.showLinkForm = false;
    this.showCatForm = false;

    this.linksToDel = [];
    this.categoriesToDel = [];

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

    // edit form mechs
    this.editLinkCategories = [];
    
    this.populateLinkEditDropDown = function(id){
        var link = '';
        this.editLinkCategories= [];
        for (var i=0; i<this_.links.length; i++){
            console.log(i)
            if (this.links[i].id == id){
                link = this_.links[i];
            }
        }
        if (link){
            for (var i=0; i<link.categories.length; i++){
                this.editLinkCategories.push(link.categories[i].id);
            }
        }
    };

    this.linkEditCheckedCategory = function(id){
        var pos = this.editLinkCategories.indexOf(id);
        if (pos > -1){
            return true;
        }
        else{
            return false;
        }
    };
    
    this.currentLinkEdit = '';
    this.swapLinkEditForm = function(id){
        this.currentLinkEdit = id;
        this.populateLinkEditDropDown(id);
    };

    // --- * ---

    this.getLinks = function(){
        $http.get(links_url, {'headers': headers}).
            then(function(response){
                this_.links = response.data;
                console.log(response);
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

    this.deleteXItems = function(X){
        ids = this[X+'ToDel'];
        for(var i=0; i<ids.length; i++){
            delete_url = base_url + X + '/' + ids[i] + '/';
            id = ids[i];
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
        } 
        this.linksToDel = [];
    };

    this.getLinks();
    this.getCategories(); 
}]);
