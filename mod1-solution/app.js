(function(){

  'use strict';

  angular.module("LunchCheck", []).controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope){

    $scope.menu = "";
    $scope.fontColor = "black";

    var numberOfItems = function(text){
      var items = [];
      text = text.split(",");
      for (var i=0; i<text.length; i++){
        var item = text[i];
        if (item.trim().length != 0){
          items.push(item);
        }
      }
      return items.length;
    }

    $scope.checkIfTooMuch = function(){
      var items = numberOfItems($scope.menu);
      var message = "Please enter data first";
      var fontColor = "red";
      if ($scope.menu != ""){
        fontColor = "green";
        if (items > 3){
          message = "Too much!";
        }else{
          message = "Enjoy!";
        }
      }
      $scope.message = message;
      $scope.fontColor = fontColor;
      $scope.borderStyle = "border-style: solid; border-color: " + fontColor;
    };

  };

})()
