'use strict';

angular.module('todoApp.list-controller', [])

.controller('ListCtrl', function($scope, $ionicModal, $stateParams, $ionicListDelegate, $ionicSideMenuDelegate, FolderSrvc, HelperSrvc) {

  // Save active folder id to localstorage and Initialize active folder
  FolderSrvc.setLastActiveFolder($stateParams.folderId);
  $scope.activeFolder = $scope.folders[$stateParams.folderId];

  console.log($scope.folders);
  
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
    $ionicListDelegate.closeOptionButtons();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.editListModal.remove();
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
    $ionicListDelegate.closeOptionButtons();
    $scope.closeEditListModal();
  }

  $scope.deleteList = function(index){
    $scope.activeFolder.lists.splice(index, 1);
    FolderSrvc.save($scope.folders);
  }

  $scope.toggleCompleteTask = function(listIndex, taskIndex){
    var task = $scope.activeFolder.lists[listIndex].tasks[taskIndex];
    task.isCompleted = task.isCompleted ? false : true;
    FolderSrvc.save($scope.folders);
  }

  $scope.deleteTask = function($event, newList, index){
    $event.stopPropagation();
    // $scope.activeFolder.lists[listIndex].tasks.splice(taskIndex, 1);
    newList.tasks.splice(index, 1);
  }


})