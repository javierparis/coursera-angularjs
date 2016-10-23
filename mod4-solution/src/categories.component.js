(function(){
  'use strict';

  angular.module('data').component('categories',{
    templateUrl: 'src/templates/categoriesList.template.html',
    bindings: {
      categories: '<'
    }
  });
})();
