angular.module('my-app')
.controller('FoodlistController', function($scope) {
 
})
.controller('BranchesController', function($scope,$http,$location) {
  if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  
   $scope.d_branch = localStorage.getItem('default_branch');
   $scope.goBack = function(){window.history.back();};
   if($scope.d_branch != 0 && localStorage.getItem('default_branch') != null ){
        $location.path('/menu/'+$scope.d_branch); 
   }
    $scope.go = function ( path ) {
              $location.path( path );
          };
  
   document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'branches/HamiDaMin23QZYTRRE782',
             }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.branches = response.data;
                            console.log( $scope.branches );
                           
                              
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });  
  
  $scope.add_branch = function(branch_id){
    
       document.getElementById('loading').removeAttribute('style');  
            $http({
                    method: 'POST',
                    url: base_url+'default_branch/HamiDaMin23QZYTRRE782',
                    data: $.param({ branch_id :  branch_id , user_id : localStorage.getItem('user_id') }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                $scope.d_branch = branch_id;
                                localStorage.setItem('default_branch',$scope.d_branch);
                           
                           }, function errorCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                  ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                });
                                return false;
                    }); 
  };  
  
   $scope.remove_branch = function(branch_id){
    
       document.getElementById('loading').removeAttribute('style');  
            $http({
                    method: 'POST',
                    url: base_url+'default_branch_r/HamiDaMin23QZYTRRE782',
                    data: $.param({ branch_id :  branch_id , user_id : localStorage.getItem('user_id') }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                $scope.d_branch = 0;
                                localStorage.setItem('default_branch',$scope.d_branch);
                           
                           }, function errorCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                  ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                });
                                return false;
                    }); 
  };                
})

.controller('BranchController', function($scope,$http,$location) {
  if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  
   $scope.d_branch = localStorage.getItem('default_branch');
   $scope.goBack = function(){window.history.back();};
   $scope.go = function ( path ) {
              $location.path( path );
          };
  
   document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'branches/HamiDaMin23QZYTRRE782',
             }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.branches = response.data;
                            console.log( $scope.branches );
                           
                              
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });  
  
  $scope.add_branch = function(branch_id){
    
       document.getElementById('loading').removeAttribute('style');  
            $http({
                    method: 'POST',
                    url: base_url+'default_branch/HamiDaMin23QZYTRRE782',
                    data: $.param({ branch_id :  branch_id , user_id : localStorage.getItem('user_id') }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                $scope.d_branch = branch_id;
                                localStorage.setItem('default_branch',$scope.d_branch);
                           
                           }, function errorCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                  ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                });
                                return false;
                    }); 
  };  
  
   $scope.remove_branch = function(branch_id){
    
       document.getElementById('loading').removeAttribute('style');  
            $http({
                    method: 'POST',
                    url: base_url+'default_branch_r/HamiDaMin23QZYTRRE782',
                    data: $.param({ branch_id :  branch_id , user_id : localStorage.getItem('user_id') }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                $scope.d_branch = 0;
                                localStorage.setItem('default_branch',$scope.d_branch);
                           
                           }, function errorCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                  ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                                });
                                return false;
                    }); 
  };                
});