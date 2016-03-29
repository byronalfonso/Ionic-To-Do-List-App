'use strict';

angular.module('todoApp.login-controller', [])

.controller('LoginCtrl', function($scope, $state, $timeout, $ionicLoading, $ionicPopup, UserSrvc) {

  $scope.show = function() {
    $ionicLoading.show({
      template: '<ion-spinner icon="ripple"></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  $scope.user = {
    uname:'',
    pass:''
  }

  $scope.login = function(user){
    $scope.show();
    UserSrvc.login(user).then(function(data){
      if (data) {
        $timeout(function(){
          $scope.hide();
          $state.go('app.welcome');
        }, 1000);       
      };
    }).catch(function(data){

      $timeout(function(){
        $scope.hide();
        $ionicPopup.alert({
          title: 'Login Error',
          template: 'Invalid username or password!'
        });
      }, 1000);
      
    });
  }

})