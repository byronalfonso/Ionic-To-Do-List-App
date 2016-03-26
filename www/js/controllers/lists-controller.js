'use strict';

angular.module('todoApp.list-controller', [])

.controller('ListCtrl', function($scope, $ionicModal, $stateParams, $ionicSideMenuDelegate, FolderSrvc, HelperSrvc) {

  // Save active folder id to localstorage and Initialize active folder
  FolderSrvc.setLastActiveFolder($stateParams.folderId);
  $scope.activeFolder = $scope.folders[$stateParams.folderId];

  /*************** #Modal Stuff ***************/
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

  /* Edit List Modal */

  $ionicModal.fromTemplateUrl('edit-list-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.editListModal = modal;
  });

  $scope.openEditListModal = function() {
    $scope.editListModal.show();
  };

  $scope.closeEditListModal = function() {
    $scope.editListModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.editListModal.remove();
  });

  /* Add Tasks Modal */

  $ionicModal.fromTemplateUrl('add-tasks-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.addTasksModal = modal;
  });

  $scope.openAddTasksModal = function() {
    $scope.addTasksModal.show();
  };

  $scope.closeAddTasksModal = function() {
    $scope.addTasksModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.addTasksModal.remove();
  });

  /* End of Modal */

  /*************** #Lists Data ***************/
  $scope.listsCanSwipe = true;
  $scope.selectedList = 0;

  /*************** #Lists Functions ***************/

  $scope.newList = function(){
    $scope.openNewListModal();
  }

  $scope.createList = function(list){
    //check if active folder has an empty list, if true then create empty array then push list else simply push list
    var listToAdd = angular.copy(list);

    if (HelperSrvc.isObjEmpty($scope.activeFolder.lists)) {
      $scope.activeFolder['lists'] = [];
      $scope.activeFolder.lists.push(listToAdd);
    }else{
      $scope.activeFolder.lists.push(listToAdd);
    }
    FolderSrvc.save($scope.folders);
    list.title = '';
    $scope.closeNewListModal();
    console.log($scope.folders);
  }

  $scope.editList = function(index){
    $scope.openEditListModal();
    $scope.selectedList = index;
    $scope.listToEdit = angular.copy($scope.activeFolder.lists[index]);
  }

  $scope.updateList = function(newList){
    $scope.activeFolder.lists[$scope.selectedList] = newList;
    FolderSrvc.save($scope.folders);
    $scope.closeEditListModal();
  }

  $scope.deleteList = function(index){
    $scope.activeFolder.lists.splice(index, 1);
    FolderSrvc.save($scope.folders);
  }

})