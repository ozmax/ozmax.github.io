angular.module('link-app').controller('LinksController',[ 'authService', '$http',
function(authService, $http){
    this_ = this;
    links_url = "http://ozmaxplanet.com:8000/links/"
    headers = {
        'Authorization': "Token " + authService.auth_token,
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

    this.catsInString = function(){
        categories_string = [];
        for (var i=0; i<this.selectedItems.length; i++){
            //categories_string = categories_string+this.selectedItems[i]+",";
            categories_string.push(parseInt(this.selectedItems[i]));
        }
        //var str = categories_string.slice(-1);
        //if (str == ","){
        //   categories_string = categories_string.slice(0,-1); 
        //}
        return categories_string;
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
        //categories = "1,2"//this.catsInString();
        var data = {
            'url': this.reg_url,
        };    
        console.log(data);
        $http.post(links_url, data, {'headers': headers}).
            then(function(response){
                console.log(response);
            },
            function(response){
                console.log(response);
            });
    };

    this.getLinks();
    this.getCategories(); 
}]);

