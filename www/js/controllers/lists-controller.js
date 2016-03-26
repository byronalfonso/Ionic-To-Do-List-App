'use strict';

angular.module('todoApp.list-controller', [])

.controller('ListCtrl', function($scope, $ionicModal, $timeout, $ionicHistory, $state, $ionicSideMenuDelegate, FolderSrvc) {

  /* Add List Modal */

  $ionicModal.fromTemplateUrl('add-list-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.newListModal = modal;
  });

  $scope.openNewListModal = function() {
    $scope.newListModal.show();
  };

  $scope.closeNewListModal = function() {
    $scope.newListModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.newListModal.remove();
  }); 

  /* End of Modal */


  /*************** #Lists Functions Data ***************/
  $scope.newList = function(){
    $scope.openNewListModal();
  }
})