'use strict';

angular.module('todoApp.helper-services', [])

.factory('HelperSrvc', function($q) {
	var isObjEmpty = function(obj) {
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }

	    return true;
	}

	return {		
		isObjEmpty: isObjEmpty
	};
});