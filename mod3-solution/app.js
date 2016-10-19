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
          showMessage: '<',
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
      ctrl.showTitle = function () {
        if (ctrl.found === undefined || ctrl.found.length == 0){
          return false;
        }
        return true;
      };
    }

    NarrowItDownController.$inject = ['MenuSearchService'];

    function NarrowItDownController(MenuSearchService){
      var ctrl = this;

      ctrl.showMessage = false;

      ctrl.search = function(){
        var foundItems = [];
        var showMessage = true;

        if (ctrl.searchTerm !== undefined && ctrl.searchTerm !== ''){
          var promise = MenuSearchService.getMatchedMenuItems();
          promise.then(function (response) {
            var items = response.data.menu_items;
            for (var i=0; i<items.length; i++){
              var description = items[i].description;
              if (description.indexOf(ctrl.searchTerm) != -1){
                foundItems.push(items[i]);
              }
            }
            if (foundItems.length > 0){
              showMessage = false;
            }
            ctrl.showMessage = showMessage;
          })
          .catch(function (error) {
            console.log("Something went wrong.");
          });
        }else{
          ctrl.showMessage = showMessage;
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
