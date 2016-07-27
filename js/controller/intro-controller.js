angular.module('my-app')
.controller('IntroController', function($location,$scope) {
    $scope.go = function ( path ) {$location.path( path );};
})
.directive('introDir' , function (){
		return {
			link: function() {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });
				
            }/* end */
}})
.controller('SplashController', function($scope,$location,$timeout) {
     $timeout(function() {
         if(localStorage.getItem('push_redirect'))
         {
               window.location.hash = "#/notification";  
          }
          else if(localStorage.getItem('intro'))
          {
             window.location.hash = "#/home";    
          }
          else{
              window.location.hash = "#/intro";  
          }
     },2500);
});
