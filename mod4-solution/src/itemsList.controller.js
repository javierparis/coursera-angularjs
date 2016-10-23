(function () {
'use strict';

angular.module('data')
.controller('ItemsListController', ItemsListController);


ItemsListController.$inject = ['MenuDataService', 'items'];
function ItemsListController(MenuDataService, items) {
  var itemsList = this;
  itemsList.category = items.data.category;
  itemsList.items = items.data.menu_items;
}

})();
