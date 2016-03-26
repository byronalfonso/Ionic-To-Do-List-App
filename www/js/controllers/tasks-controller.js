'use strict';

angular.module('todoApp.task-controller', [])

.controller('TaskCtrl', function($scope, $ionicModal, $ionicHistory, $stateParams, FolderSrvc, HelperSrvc) {

  // Save active list id on local storage and initialize active list
  FolderSrvc.setLastActiveList($stateParams.listId);
  $scope.activeList = $scope.folders[FolderSrvc.getLastActiveFolder()].lists[$stateParams.listId];  

  $scope.goBack = function(){
    $ionicHistory.goBack();
  }

   /*************** #Modal Stuff ***************/

  /* Add Task Modal */

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

  /* Edit Task Modal */

  $ionicModal.fromTemplateUrl('edit-task-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.editTaskModal = modal;
  });

  $scope.openEditTaskModal = function() {
    $scope.editTaskModal.show();
  };

  $scope.closeEditTaskModal = function() {
    $scope.editTaskModal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.editTaskModal.remove();
  });
  
  /* Edit Task Modal */

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

  $scope.editTask = function(index){
    $scope.openEditTaskModal();
    $scope.selectedTask = index;
    $scope.taskToEdit = angular.copy($scope.activeList.tasks[index]);
  }

  $scope.updateTask = function(newTask){
    $scope.activeList.tasks[$scope.selectedTask] = newTask;
    FolderSrvc.save($scope.folders);
    $scope.closeEditTaskModal();
  }

  $scope.deleteTask = function(index){
    $scope.activeList.tasks.splice(index, 1);
    FolderSrvc.save($scope.folders);
  }

})