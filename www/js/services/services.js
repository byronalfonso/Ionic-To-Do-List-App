'use strict';

angular.module('todoApp.services', ['todoApp.user-services', 'todoApp.helper-services'])

.factory('FolderSrvc', function($q, UserSrvc) {

	var FOLDER_KEY = 'folders'
	var LAST_ACTIVE_FOLDER_KEY = 'active_folder'
	var LAST_ACTIVE_LIST_KEY = 'active_list'
	
	var getAll = function(){		
		// Get all users and use the active user's index that's been saved in local storage.
		var users = UserSrvc.getUsers();
		var activeUser = users[UserSrvc.getLastActiveUser()];
		
		// Check whether there's an existing folders prop in the active user; if tru then return them else return new and empty array.		
		if("folders" in activeUser) {
			return angular.fromJson(activeUser.folders);
		}else{
			activeUser['folders'] = [];
			return activeUser.folders;			
		}
	}

	// Save and update the folders to the users
	var save = function(folders){
		var users = UserSrvc.getUsers();
		var activeUser = users[UserSrvc.getLastActiveUser()];
		activeUser.folders = folders;
		UserSrvc.save(users);
	}


	/*
		Following two functions are currently unused but not removed for possible future use
	*/
	var setLastActiveFolder = function(index){
		window.localStorage[LAST_ACTIVE_FOLDER_KEY] = index;
	}

	var getLastActiveFolder = function(index){
		var activeFolder = window.localStorage[LAST_ACTIVE_FOLDER_KEY];
		
		if(activeFolder) {
			return angular.fromJson(activeFolder);
		}

		return [];		
	}

	/*
		Set/save the last active list for tracking on local storage
	*/
	var setLastActiveList = function(index){
		window.localStorage[LAST_ACTIVE_LIST_KEY] = index;
	}

	/*
		return the the index of the last active list from local storage.
	*/
	var getLastActiveList = function(index){
		var activeList = window.localStorage[LAST_ACTIVE_LIST_KEY];
		
		if(activeList) {
			return angular.fromJson(activeList);
		}

		return [];		
	}

	return {
		getAll: getAll,
		save: save,
		setLastActiveFolder: setLastActiveFolder,
		getLastActiveFolder: getLastActiveFolder,
		setLastActiveList: setLastActiveList,
		getLastActiveList: getLastActiveList,
	};
});