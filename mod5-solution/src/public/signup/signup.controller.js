(function(){
  'use strict';

  angular.module('public').controller('SignUpController', SignUpController);

  SignUpController.$inject = ['MenuService', 'UserService'];

  function SignUpController(MenuService, UserService){
    var ctrl = this;

    ctrl.validMenuNumber = true;

    ctrl.user = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      menuitem: ''
    };

    ctrl.submit = function(){
      var menuItem = MenuService.getMenuItem(ctrl.menunumber);
      menuItem.then(function (data) {
        /* Save information */
        var user = {};
        user.firstName = ctrl.user.firstname;
        user.lastName = ctrl.user.lastname;
        user.email = ctrl.user.email;
        user.phone = ctrl.user.phone;
        user.menuitem = data;
        UserService.saveUser(user);
        ctrl.completed = true;
        ctrl.validMenuNumber = true;
      }).catch(function(error){
        ctrl.validMenuNumber = false;
      });

    };


  }

})();
