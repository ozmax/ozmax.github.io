angular.module('link-app').controller('ContactsController',[ 'authService',
'$http', function(authService, $http){
    this_ = this;
    base_url = "http://ozmaxplanet.com:8000/";
    contacts_url = "http://ozmaxplanet.com:8000/contacts/";
    groups_url = "http://ozmaxplanet.com:8000/groups/";
    headers = {
        'Authorization': "Token " + authService.auth_token,
        'Content-Type': 'application/json'
    };
    this_ = this;
    this.showContactForm = false;
    this.showGroupForm = false;

    // --- dropdown mechs ---
    this.menuOpen = false;
    this.selectedGroups = [];
    this.selectedEditGroups = [];

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

    this.clickXGroup = function(X, id){
        pos = this['selected'+X+'Groups'].indexOf(id);
        if (pos > -1) {
            this['selected'+X+'Groups'].splice(pos, 1);
        }
        else{
            this['selected'+X+'Groups'].push(id);
        }
    };

    this.isXChecked = function(X, id){
        pos = this['selected'+X+'Groups'].indexOf(id);
        if (pos > -1) {
            return true;
        }
        else{
            return false;
        }
    };

    this.populateContactEditDropDown = function(contact){
        this.selectedEditGroups = [];
        if (contact){
            for (var i=0; i<contact.groups.length; i++){
                this.selectedEditGroups.push(contact.groups[i].id);
            }
        }
    };
    // --- end dropdown form mechs ---
    
    // --- common functions of link and category ---
    this.contactsToDel = [];
    this.groupsToDel = [];

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
        this.contactsToDel = [];
    };
    // --- end common functions for link and category---

    // --- links ---
    this.getContactById = function(id){
        for (var i=0; i<this.contacts.length; i++){
            if (this.contacts[i].id == id){
                return this.contacts[i];
            }
        } 
    };

    this.getContacts = function(){
        $http.get(contacts_url, {'headers': headers}).
            then(function(response){
                this_.contacts = response.data;
            },
            function(response){
                console.log(response);
            });
    };
    
    this.submitContact = function(){
        var data = {
            'full_name': this.fullName,
            'email': this.email,
            'groups': this.selectedGroups
        };    
        $http.post(contacts_url, data, {'headers': headers}).
            then(function(response){
                this_.getContacts();
                this_.closeAndCleanContactForm();
            },
            function(response){
                console.log(response);
            });
    };
    
    this.closeAndCleanContactForm = function(){
        this.fullName = '';
        this.selectedGroups = [];
        this.showContactForm = false;
    };

    this.updateContact = function(id){
        var data = {
            'full_name': this.updatedFullName,
            'email': this.updatedEmail,
            'groups': this.selectedEditGroups
        };
        var url = contacts_url + id + '/';
        $http.put(url, data, {'headers': headers}).
            then(function(response){
                this_.getContacts();
                this_.currentContactEdit = '';
            },
            function(response){
                console.log(response);
            });
    };
    // --- end links ---
    
    // --- categories ---
    this.getGroupById = function(id){
        for (var i=0; i<this.groups.length; i++){
            if (this.groups[i].id == id){
                return this.groups[i];
            }
        } 
    };

    this.getGroups = function(){
        headers = {'Authorization': "Token " + authService.auth_token};
        $http.get(groups_url, {'headers': headers}).
            then(function(response){
                this_.groups = response.data;
            },
            function(response){
                console.log(response)
            });
    };

    this.submitGroup = function(){
        data = {
            'name': this.updatedGroupName
        };
        $http.post(groups_url, data, {'headers': headers}).
            then(function(response){
                this_.getGroups();
            },
            function(response){
                console.log(response);
            });
    };

    this.updateGroup = function(id){
        data = {'name': this.updatedGroupName};
        url = groups_url + id + '/';
        $http.put(url, data, {'headers': headers}).
            then(function(response){
                this_.getGroups();
                this_.getContacts();
                this_.currentGroupEdit = '';
            },
            function(response){
                console.log(response);
            });
    };
    // --- end categories ---

    // --- common edit form mechs ---
    this.currentContactEdit = '';
    this.currentGroupEdit = '';
    this.swapXEditForm = function(X, id){
        this['current'+X+'Edit'] = id;
        if (X == 'Contact' && id){
            var contact = this.getContactById(id)
            this.updatedFullName = contact.full_name;
            this.updatedEmail = contact.email;
            this.populateContactEditDropDown(contact);
        }
        if (X == 'Group' && id){
            group= this.getGroupById(id);
            this.updatedGroupName = group.name;
        }
    };
    // --- end edit form mechs ---

    this.getContacts();
    this.getGroups(); 
}]);
