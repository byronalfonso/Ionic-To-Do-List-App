'use strict';

angular.module('todoApp.user-services', [])

.factory('UserSrvc', function($q) {

	/*
		Simple Login System - Local Storage:
		----------------------------------------
		Users OBJ will hold all users added via user sign up.
		Upon login, check whether user exists in the Users Obj. If not prompt error else redirect to welcome.
		Upon successful login, save last active user.
		Each will have his own sets of folders
	*/

	var USER_KEY = 'users'
	var LAST_ACTIVE_USER = 'active_user'

	// Save users data and push to localstorage
	var save = function(users){
		window.localStorage[USER_KEY] = angular.toJson(users);		
	}
	
	//check if users obj exists in localstorage, if true return else return empty array
	var getUsers = function(){		
		var users = window.localStorage[USER_KEY];
		
		if(users) {
			return angular.fromJson(users);
		}

		return [];
	}

	//Used for validating username existence during registration
	var userExists = function(user){
		var users = getUsers();
		var exists = 0;		
		
		users.forEach(function(currentUser){
			if (user.uname===currentUser.uname) {
				exists++;
			}
		});

		return exists>0 ? true : false;
	}
	
	//Used for authenticating user from existing users from local storage
	var authenticateUser = function(user){
		var users = getUsers();
		var index = null;

		for (var i = 0; i < users.length; i++) {
			if (user.uname === users[i].uname && user.pass === users[i].pass) {
				index = i;
				break;
			}

		};

		return index;
	}

	// Save the index of the last active user
	var setLastActiveUser = function(index){
		window.localStorage[LAST_ACTIVE_USER] = angular.toJson(index);
	}

	// get the index of the last active user
	var getLastActiveUser = function(){
		var activeUser = window.localStorage[LAST_ACTIVE_USER];
		
		if(activeUser) {
			return angular.fromJson(activeUser);
		}

		return [];	
	}

	var login = function(user){
		var q = $q.defer();	
		var users = getUsers();

		//If users data is not empty then authenticate user
		if(users.length>0) {
			var userIndex = authenticateUser(user);
			if (userIndex!==null) {
				setLastActiveUser(userIndex);
				q.resolve(users);
			}else{			
				q.reject('ERROR: Invalid user!');
			}
		}else{
			q.reject('ERROR: Invalid user!');
		}

		return q.promise;
	}

	var logout = function(){
		window.localStorage.removeItem(LAST_ACTIVE_USER);
	}

	var register = function(user){
		var q = $q.defer();	
		var users = getUsers();
		
		//If there are existing users, then validate; else just add
		if(users.length>0) {

			if (userExists(user)) {				
				q.reject('ERROR!! USER ALREADY EXISTS!!');
			}else{			
				users.push(user);				
				save(users);				
				setLastActiveUser(users.indexOf(user));				
				q.resolve(users);
			}			
			
		}else{
			users.push(user);
			save(users);
			setLastActiveUser(users.indexOf(user));
			q.resolve(users);
		}
		
		return q.promise;		
	}

	return {		
		getUsers: getUsers,
		login: login,
		register: register,
		getLastActiveUser: getLastActiveUser,
		save: save,
		logout: logout
	};
});