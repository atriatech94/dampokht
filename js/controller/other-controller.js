angular.module('my-app') 
.controller('faqController', function($scope,$http,$sce,$location) {
  if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  
    $scope.go = function ( path ) {$location.path( path );};
    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        }else{
            $scope.shownGroup = group;
        }
    };
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    };
    
     document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'faq/HamiDaMin23QZYTRRE782'
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.faq = response.data;
                            for(var i=0 ; i < $scope.faq.length ; i++ ){
                                   $scope.faq[i].answer = $sce.trustAsHtml( $scope.faq[i].answer);
                            }
                             
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });  
    

})
.controller('lawController', function($scope,$http,$sce,$location) {
  if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  
      $scope.go = function ( path ) {$location.path( path );};
     document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'law/HamiDaMin23QZYTRRE782',
             }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.laws = response.data;
                            for(var i=0 ; i < $scope.laws.length ; i++ ){
                                   $scope.laws[i].text = $sce.trustAsHtml( $scope.laws[i].text);
                            }
                              
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });  
    
});