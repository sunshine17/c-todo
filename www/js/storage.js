/* !!! IMPORTANT: Rename "mymodule" below and add your module to Angular Modules above. */

angular.module('storage', ['ngCordova.plugins.nativeStorage'])

.service('DB', ['$cordovaNativeStorage', function($cordovaNativeStorage){
    
    var genOnErr = (onSucc)=>{
        return function(error){
            console.log('=== ERR ===');
            console.log(error);
            if (error.exception !== ""){ 
                console.log(error.exception);
            }
            if(_.isFunction(onSucc)){
                onSucc(undefined);
            }
        };
    };
    
    this.get = function(key, onSucc){
        $cordovaNativeStorage.getItem(key).then(onSucc, genOnErr(onSucc));
    }; // get()

    this.save = function(key, obj, onSucc){
        $cordovaNativeStorage.setItem(key, obj).then(onSucc, genOnErr(onSucc));
    }; // save()

    this.rm = function(key, onSucc){
        $cordovaNativeStorage.remove(key).then(onSucc, genOnErr(onSucc));
    };
    
    this.nextId = function(key, cb){
        var _k = 'id_' + key;
        this.get(_k, (val)=>{
            var nextVal = val ? val + 1 : 1;
            this.save(_k, nextVal, (_next) => {
                cb(_next);
            });
        })
    };
}])

;

