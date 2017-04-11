// angular.module('todos', ['firebase', 'storage'])
angular.module('todos', ['storage'])

.run(($ionicPlatform, Todos)=>{
     $ionicPlatform.ready(()=>{
        Todos.loadAll(); 
    });
})
    

// .run(function(){
//      // Initialize Firebase
//       var config = {
//         apiKey: "AIzaSyDH_BkA_9YK87kG8X7d0R-Ax0pL2HhTF1o",
//         authDomain: "todo-26d07.firebaseapp.com",
//         databaseURL: "https://todo-26d07.firebaseio.com",
//         storageBucket: "todo-26d07.appspot.com",
//         messagingSenderId: "568441753876"
//       };
//       firebase.initializeApp(config);   
// })

.service('Todos', ['DB', function(DB){
    
    var items = null;
    var key = 'Todo_all';

    
    var save = ()=>{
        console.dir(items);
        DB.save(key, items, (data)=>{
            console.log('saved: ' + data);
        });
    };
    
    var onLoad = (cb, $scope)=>{
        if($scope){
            $scope.items = items;
        }
        if(_.isFunction(cb)){
            return cb(items);
        }
    }
    
    return {
        getItems: ($scope)=>{
            if(items === null){
                loadAll(null, $scope);
            }else{
                $scope.items = items;
            }
        },
        
        loadAll: (cb, $scope)=>{
            if(items !== null){
                return onLoad(cb, $scope);
            }
            DB.get(key, (all)=>{
                console.log(all);
                items = all || {};
                onLoad(cb, $scope);
            });
        },
        
        addItem: function(title){
            DB.nextId('todo', (id)=>{
                items[id] = {'finished': false, 'title': title, '$id': id};
                save();
            });
        },
        
        setFinished: function(item, newV){
            item.finished = newV;
            items[item.$id] = item;
            save();
        },
    };
}])

;

