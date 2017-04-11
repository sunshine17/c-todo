angular.module('app.controllers', [])
  
.controller('todosCtrl', ['$scope', '$stateParams', 'Todos', '$ionicModal', '$ionicPlatform', '$cordovaNativeStorage', '$log', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Todos, $ionicModal, $ionicPlatform, $cordovaNativeStorage, $log) {

    $scope.data = {'title': ''};

    $ionicModal.fromTemplateUrl('add.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
     });
    
    $scope.showModal = function(){
        $scope.modal.show();
    };  

    $scope.closeModal = function(){
        $scope.data.title = '';
        $scope.modal.hide();
    };
    
    $scope.addItem = function(){
        Todos.addItem($scope.data.title);    
        $scope.closeModal();
    };
    
    Todos.loadAll(()=>{
        
    }, $scope);

    
}])
   
.controller('finishedItemsCtrl', ['$scope', '$stateParams', 'Todos', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Todos, $ionicPlatform) {
   
    Todos.loadAll(()=>{}, $scope);
   
}])
      
.controller('todoItemCtrl', ['$scope', '$stateParams', 'Todos', '$ionicPlatform', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, Todos, $ionicPlatform) {
    

    Todos.loadAll((items)=>{
        $scope.item = $scope.items[$stateParams.item];
    }, $scope);

    $scope.toggleFinished = function(){
        $scope.item.finished = !$scope.item.finished;
        Todos.setFinished($scope.item, $scope.item.finished);
    }
}])
 