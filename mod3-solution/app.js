(function(){
    'use strict';

    angular.module('NarrowItDownApp', [])
      .controller('NarrowItDownController', NarrowItDownController)
      .service('MenuSearchService', MenuSearchService)
      .directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective(){
      var ddo = {
        templateUrl: 'foundItems.html',
        scope: {
          found: '<',
          onRemove: '&'
        },
        controller: FoundItemsDirectiveController,
        controllerAs: 'foundItemsCtrl',
        bindToController: true
      };
      return ddo;
    }

    function FoundItemsDirectiveController(){
      var ctrl = this;

    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
      var ctrl = this;

      ctrl.search = function(){
        var promise = MenuSearchService.getMatchedMenuItems();

        promise.then(function (response) {
          var foundItems = [];
          var items = response.data.menu_items;
          for (var i=0; i<items.length; i++){
            var description = items[i].description;
            if (description.indexOf(ctrl.searchTerm) != -1){
              foundItems.push(items[i]);
            }
          }
          ctrl.found = foundItems;
        })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
      };

      ctrl.removeItem = function (itemIndex) {
        ctrl.found.splice(itemIndex, 1);
      };

    }

    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
      var service = this;

      service.getMatchedMenuItems = function(){
        var response = $http({
          method: "GET",
          url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        });
        return response;
      };
    }

})();
