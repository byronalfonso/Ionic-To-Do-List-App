'use strict';

angular.module('todoApp.signup-controller', [])

.controller('SignupCtrl', function($scope, $state, $timeout, $ionicLoading, $ionicPopup, UserSrvc) {

	/* Ionic Loading Stuff */

	$scope.show = function() {
		$ionicLoading.show({
			template: '<ion-spinner icon="ripple"></ion-spinner>'
		});
	};

	$scope.hide = function(){
		$ionicLoading.hide();
	};

	/* End Ionic Loading Stuff */

	$scope.user = {
		uname:'',
		pass:''
	}

	$scope.register = function(user){
		$scope.show();

		UserSrvc.register(user).then(function(data){
			if (data) {
				$timeout(function(){
					$scope.hide();

					//reset the user data
					$scope.user = {
						uname:'',
						pass:''
					}

					//redirect to welcome page after successful login
					$state.go('app.welcome');
				}, 1000);				
			};
		}).catch(function(data){
			//Catch login error and display message
			$timeout(function(){
				$scope.hide();
				$ionicPopup.alert({
					title: 'Registration Error',
					template: 'Username already exists! Please try another one.'
				});
				$scope.user = {
					uname:'',
					pass:''
				}
			}, 1000);
			
		});
	}

})