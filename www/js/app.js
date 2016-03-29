'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('todoApp', ['ionic', 'todoApp.controllers', 'todoApp.services'])

.run(function($ionicPlatform, $rootScope, $state, UserSrvc) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  /*
    If Last Active user has logged out the last time or no one has has logged in yet, then restrict access to other pages
  */
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (UserSrvc.getLastActiveUser().length<=0) {
       if (next.name !== 'login' && next.name !== 'signup') {
         event.preventDefault();   
         $state.go('login');
       }
     }
  });

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl',
    cache: false
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl',
    cache: false
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl',
    cache: false
  })

  .state('app.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcome.html'
      }
    },
    cache: false
  })  

  .state('app.guide', {
    url: '/guide',
    views: {
      'menuContent': {
        templateUrl: 'templates/guide.html'
      }
    },
  })

  .state('app.lists', {
    url: '/lists/:folderId',
    views: {
      'menuContent': {
        templateUrl: 'templates/lists.html',
        controller: 'ListCtrl',        
      }
    },
    cache: false
  })

  .state('app.tasks', {
    url: '/tasks/:listId',
    views: {
      'menuContent': {
        templateUrl: 'templates/tasks.html',
        controller: 'TaskCtrl',       
      }
    },
    cache: false
  })

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/app/welcome');
  $urlRouterProvider.otherwise('/login');
});
