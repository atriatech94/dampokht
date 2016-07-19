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
}});
