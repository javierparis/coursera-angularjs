(function(){
  'use strict';

  angular.module('data').component('items',{
    templateUrl: 'src/templates/itemsList.template.html',
    bindings: {
      items: '<'
    }
  });
})();
