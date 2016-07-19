angular.module('my-app')
.controller('notificationController', function($scope,$http,$location,$route) {
      $scope.go = function ( path ) {$location.path( path );};
         $scope.offset = 0;
        
         $scope.refresh = function(){
             $route.reload();
         }; 

       $scope.loaded = false;
       document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'notification_history/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+$scope.offset
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.messages = response.data;
                            if($scope.messages.length < 10)
                               $scope.loaded = false;
                            else   
                              $scope.loaded = true;
                            $scope.offset = $scope.offset + $scope.messages.length;
                         }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });

     $scope.load_more = function(){
            document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'notification_history/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+$scope.offset
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.messages = $scope.messages.concat(response.data);
                            $scope.loaded = true;
                            $scope.offset = $scope.offset + $scope.messages.length;
                            if(response.data.length < 10)
                               $scope.loaded = false;
                            else   
                              $scope.loaded = true;

                         }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });
       
     };            
      
});