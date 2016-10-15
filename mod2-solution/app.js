(function(){
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function(itemIndex){
      ShoppingListCheckOffService.removeItem(itemIndex);
    };
  }

  function AlreadyBoughtController(ShoppingListCheckOffService){
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService(){
    var service = this;

    var toBuyItems = [
      { name: "carrots", quantity: 7 },
      { name: "sausages", quantity: 6 },
      { name: "bottles of milk", quantity: 2 },
      { name: "cookies", quantity: 10 },
      { name: "potatos", quantity: 23 }
    ];

    var boughtItems = [];

    service.getToBuyItems = function(){
      return toBuyItems;
    };

    service.removeItem = function(itemIndex){
      var item = toBuyItems[itemIndex];
      boughtItems.push(item);
      toBuyItems.splice(itemIndex,1);
    };

    service.getBoughtItems = function(){
      return boughtItems;
    };
  }

})();
