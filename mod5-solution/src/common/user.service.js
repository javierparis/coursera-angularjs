(function () {
  "use strict";

  angular.module('common').service('UserService', UserService);

  UserService.$inject = [];

  function UserService() {
    var service = this;

    service.user = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      menuitem: {}
    };

    service.saveUser = function (user) {
      if (user.menuitem){
        service.user.firstName = user.firstName;
        service.user.lastName = user.lastName;
        service.user.email = user.email;
        service.user.phone = user.phone;
        service.user.menuitem = user.menuitem;
      }
    };

    service.getUser = function(){
      return service.user;
    }
  }
})();
