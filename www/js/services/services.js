'use strict';

angular.module('todoApp.services', [])

.factory('FolderSrvc', function($q) {

	var FOLDER_KEY = 'folders'
	var LAST_ACTIVE_FOLDER_KEY = 'active_folder'
	
	var getAll = function(){		
		var folders = window.localStorage[FOLDER_KEY];
		
		if(folders) {
			return angular.fromJson(folders);
		}

		return []; 
	}

	var save = function(folders){
		window.localStorage[FOLDER_KEY] = angular.toJson(folders);
	}

	return {
		getAll: getAll,
		save: save,
	};
});


// return {
//     all: function() {
//       var projectString = window.localStorage['projects'];
//       if(projectString) {
//         return angular.fromJson(projectString);
//       }
//       return [];
//     },
//     save: function(projects) {
//       window.localStorage['projects'] = angular.toJson(projects);
//     },
//     newProject: function(projectTitle) {
//       // Add a new project
//       return {
//         title: projectTitle,
//         tasks: []
//       };
//     },
//     getLastActiveIndex: function() {
//       return parseInt(window.localStorage['lastActiveProject']) || 0;
//     },
//     setLastActiveIndex: function(index) {
//       window.localStorage['lastActiveProject'] = index;
//     }
//   }