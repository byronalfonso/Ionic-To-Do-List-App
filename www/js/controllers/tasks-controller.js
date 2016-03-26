'use strict';

angular.module('todoApp.task-controller', [])

.controller('TaskCtrl', function($scope, $ionicModal, $ionicHistory, $stateParams, FolderSrvc, HelperSrvc) {

  // Save active list id on local storage and initialize active list
  FolderSrvc.setLastActiveList($stateParams.listId);
  $scope.activeList = $scope.folders[FolderSrvc.getLastActiveFolder()].lists[$stateParams.listId];

  console.log($scope.activeList);

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

   /*************** #Modal Stuff ***************/
  /* Add List Modal */

  $ionicModal.fromTemplateUrl('add-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.newTaskModal = modal;
  });

  $scope.openNewTaskModal = function() {
    $scope.newTaskModal.show();
  };

  $scope.closeNewTaskModal = function() {
    $scope.newTaskModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.newTaskModal.remove();
  });
  
  /* Add Tasks Modal */

  /*************** #Tasks Data ***************/
  $scope.tasksCanSwipe = true;

  /*************** #Tasks Functions ***************/

  $scope.newTask = function(){
    $scope.openNewTaskModal();
  }

  $scope.createTask = function(task){
    //check if active folder has an empty list, if true then create empty array then push list else simply push list
    var taskToAdd = angular.copy(task);
    
    // alert('Create task!');
    // console.log(taskToAdd);

    if (HelperSrvc.isObjEmpty($scope.activeList.tasks)) {
      $scope.activeList['tasks'] = [];
      $scope.activeList.tasks.push(taskToAdd);
    }else{
      $scope.activeList.tasks.push(taskToAdd);
    }

    FolderSrvc.save($scope.folders);

    task.title = '';
    $scope.closeNewTaskModal();
    console.log($scope.folders);
  }

  $scope.deleteTask = function(index){
    $scope.activeList.tasks.splice(index, 1);
    FolderSrvc.save($scope.folders);
  }

})