angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.todos', {
    url: '/todos',
    views: {
      'tab1': {
        templateUrl: 'templates/todos.html',
        controller: 'todosCtrl'
      }
    }
  })

  .state('tabsController.finishedItems', {
    url: '/finished',
    views: {
      'tab2': {
        templateUrl: 'templates/finishedItems.html',
        controller: 'finishedItemsCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.todoItem'
      2) Using $state.go programatically:
        $state.go('tabsController.todoItem');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/item
      /page1/tab2/item
  */
  .state('tabsController.todoItem', {
    url: '/item',
	params: {
		item: ""		
},
    views: {
      'tab1': {
        templateUrl: 'templates/todoItem.html',
        controller: 'todoItemCtrl'
      },
      'tab2': {
        templateUrl: 'templates/todoItem.html',
        controller: 'todoItemCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/todos')

  

});