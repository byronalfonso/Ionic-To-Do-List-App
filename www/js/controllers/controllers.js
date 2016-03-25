angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  /* #Modal Stuff */

  $ionicModal.fromTemplateUrl('add-folder-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openAddFolderModal = function() {
    $scope.modal.show();
  };

  $scope.closeAddFolderModal = function() {
    $scope.modal.hide();
  };

  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });  

  /* End of Modal */


  // Dummy folders  
  $scope.folders = [
    {title: "Work"},  
    {title: "School"},  
    {title: "Tournament"},  
  ]

  // $scope.folder = [];

  /* #Folder Functions */

  $scope.createFolder = function(folder){
    var folderToAdd = angular.copy(folder);
    $scope.folders.push(folderToAdd);
    folder.title = "";
  }



})

.controller('PlaylistCtrl', function($scope, $ionicModal, $timeout) {
})