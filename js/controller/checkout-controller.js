angular.module('my-app')
.controller('checkoutController', function($scope,$http,$location,$routeParams,$filter,$rootScope) {
     if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  
     $scope.go = function(path){
            $location.path(path);
        }; 
     
     $scope.total = 0 ;
        if(localStorage.getItem('cart'))
        {
            $scope.cart = JSON.parse(localStorage.getItem('cart'));
             if($scope.cart.length == 0)
                {
                    $location.path('/cart');
                }
                else{
                  
                   $scope.addresses1 = JSON.parse(localStorage.getItem('address')); 
                   $scope.addresses = $filter('filter')( $scope.addresses1, {branch_id : $routeParams.id} ,true); 
                   $scope.foods  = $filter('filter')($scope.cart, {branch_id : $routeParams.id} ,true);  
                   for(var i=0 ; i< $scope.foods.length ; i++){
                        $scope.total =  $scope.total + ( $scope.foods[i].price *  $scope.foods[i].quantity);
                   }
                      
                 }
          document.getElementById('loading').removeAttribute('style');   
          $http({
                method: 'POST',
                url: base_url+'off/HamiDaMin23QZYTRRE782',
                data: $.param({
                   user_id :  localStorage.getItem('user_id')
                   }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                                  document.getElementById('loading').setAttribute('style','display:none;'); 
                                  $scope.profile = response.data.profile;
                                  $scope.change_rate = response.data.off;
                                  $scope.c_off = 0;
                                  $scope.zero = 0;
                                  $scope.p = $scope.profile[0].point;
                                
                         }, function errorCallback(response) {
                              document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        $location.path('/cart');   
                        return false;
                 }); 
              
              
            $scope.off = function(point){
             
             if( $scope.c_off == 0){
                 var totalPrice = $scope.total + $scope.total * 0.09;
                 var totalOff = parseInt( $scope.change_rate[0].off ) * parseInt(point);
                 var finalPrice = totalPrice - totalOff; 
               if(finalPrice >= 0)
                    {    
                        $scope.c_off = totalOff;
                        $scope.profile[0].point = 0 ;
                    }
                    else
                    {
                        var points = Math.ceil( totalPrice / $scope.change_rate[0].off );
                        var remain_p = point - points;
                        $scope.profile[0].point = remain_p ;
                        $scope.c_off = totalPrice;
                        $scope.zero = 1;
                     }
                }
                else{
                    
                    $scope.c_off = 0;
                    $scope.profile[0].point = $scope.p ; 
                     $scope.zero = 0;
                }   
               
               
              
            };  
            $scope.address_1 = "";
          
          
            $scope.submit =  function(payment){
               $scope.description = document.getElementById('description').value;
               if(  $scope.address_1 == ""){
                     ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'لطفا یک آدرس انتخاب کنید !!'
                           });
                         return false;  
               }
               if(payment == 1){
                   
                   ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'پرداخت آنلاین به زودی راه اندازی می شود !!'
                           });
                          return false;    
               }
               
               if(payment == 3){
                     
                  var total_p = ($scope.total +  $scope.total * 0.09) -  $scope.c_off;
                    if(  $scope.profile[0].credit < total_p  ){
                            ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'اعتبار حساب کاربری شما کافی نیست !!'
                                });
                                return false;  
                    }
                    
                    
               }
              
               
                 document.getElementById('loading').removeAttribute('style');   
                     $http({
                        method: 'POST',
                        url: base_url+'submit_order/HamiDaMin23QZYTRRE78256WE',
                        data: $.param({
                            user_id :  localStorage.getItem('user_id'),
                            cart :  JSON.stringify($scope.foods),
                            off :  $scope.c_off,
                            address :   $scope.address_1,
                            payment : payment,
                            description :  $scope.description
                        }),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function successCallback(response) {
                                        document.getElementById('loading').setAttribute('style','display:none;'); 
                                        if(response.data.done == 1){
                                             $rootScope.order_result = response.data;
                                              $location.path('/myprofile/order_true');
                                        }
                                       else if(response.data.done == 2)
                                        {
                                            var msg = response.data.food[0].name;
                                            for(var k=1 ; k < response.data.food.length ; k++){
                                                msg = msg+" و "+response.data.food[k].name;
                                            }
                                            
                                             ons.notification.alert({
                                                    title: 'خطا',
                                                    buttonLabel:"بستن " ,
                                                    message: msg+" موجود نیست "
                                            }); 
                                            $location.path('/cart');
                                           
                                        }
                                       
                                        else
                                        {
                                             ons.notification.alert({
                                                    title: 'خطا',
                                                    buttonLabel:"بستن " ,
                                                    message: 'خطا در ثبت سفارش دوباره تلاش کنید !!'
                                            });
                                           
                                        }
                                       
                               
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
           
        
            $scope.addr =  function(address){
                var a = document.getElementsByClassName('address-p');
                for(var i=0;i<a.length;i++){
                   a[i].removeAttribute("checked");
                }
                document.getElementById('p-'+address).setAttribute("checked", "checked");
                $scope.address_1 = address;
           };    
            
        }
        else{
             $location.path('/cart');
        }
        
})
.controller('OrdertrueController',function($scope,$location,$rootScope,$filter){
    $scope.go = function ( path ) {$location.path( path );};
    $scope.result = $rootScope.order_result;
    $scope.branch_id = $scope.result.final_result.branch_id;
    $scope.cart = JSON.parse(localStorage.getItem('cart'));
    $scope.cart_branch = JSON.parse(localStorage.getItem('cart_branch'));
    $scope.cart_branch_new = $filter('filter')($scope.cart_branch,{branch_id:'!'+$scope.branch_id},true);
    $scope.cart_new = $filter('filter')($scope.cart,{branch_id:'!'+$scope.branch_id},true);
    localStorage.setItem('cart',JSON.stringify($scope.cart_new));
    localStorage.setItem('cart_branch',JSON.stringify($scope.cart_branch_new));
})
.controller('OrderfalseController',function($scope,$location){
    $scope.go = function ( path ) {$location.path( path );};
});
