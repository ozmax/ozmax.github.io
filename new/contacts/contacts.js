angular.module('link-app').controller('ContactsController', ['authService', '$http', function(authService, $http){
    this_ = this;
    url = "http://ozmaxplanet.com:8000/contacts/";
    headers = {'Authorization': 'Token ' + authService.auth_token};
    this.showForm = true;
    this.swapShowForm = function(){
        if (this.showForm == false){
            this.full_name = "";
            this.email = "";
            this.id = "";
            this.showForm = true;    
        }
        else{
            this.full_name = "";
            this.email = "";
            this.id = "";
            this.showForm = false;
        }
    };
    this.submitForm = function(){
        if (this.id){
            patchData = {
                'full_name': this.full_name,
                'email':  this.email
            };
            url_id = this.id+"/"
            $http.patch(url+url_id, patchData, {'headers': headers}).
                then(function(response){
                    this_.showForm = false;
                    this_.getContacts();
                },
                function(response){
                    authService.check_401(response)
                });

        }
        else{
            postData = {
                'full_name': this.full_name,
                'email': this.email
            };
            $http.post(url, postData, {'headers': headers}).
                then(function(response){
                    this_.showForm = false;
                    this_.getContacts();
                },
                function(response){
                    authService.check_401(response)
                });
        }
    };
    cat_url = "http://ozmaxplanet.com:8000/categories/";
    this.getCategories = function(){
        $http.get(cat_url, {'headers': headers}).
            then(function(response){
                this_.categories = response.data
            },
            function(response){
            
            });
    }
    this.getContacts = function(){
        $http.get(url, {'headers': headers}).
            then(function(response){
                this_.data = response.data;
            },
            function(response){
                authService.check_401(response)
            });
    };
    this.editContact = function(index){
        this.showForm = true;
        contact = this.data[index];
        this.full_name = contact.full_name;
        this.email = contact.email;
        this.id = contact.id;
        
    };
    this.delete = function(id){
        $http.delete(url+id+'/', {'headers': headers}).
            then(function(response){
                this_.getContacts();
            },
            function(response){
                authService.check_401(response)
            });
    };
    this.getContacts();
    this.getCategories();

}]);

