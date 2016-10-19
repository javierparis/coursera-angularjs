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

      ctrl.showMessage = function () {
        if (ctrl.found !== undefined && ctrl.found.length == 0){
          return true;
        }
        return false;
      };

    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
      var ctrl = this;

      ctrl.search = function(){
        var foundItems = [];
        if (ctrl.searchTerm !== ''){
          var promise = MenuSearchService.getMatchedMenuItems();
          promise.then(function (response) {
            var items = response.data.menu_items;
            for (var i=0; i<items.length; i++){
              var description = items[i].description;
              if (description.indexOf(ctrl.searchTerm) != -1){
                foundItems.push(items[i]);
              }
            }

          })
          .catch(function (error) {
            console.log("Something went wrong.");
          });
        }
        ctrl.found = foundItems;
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
