angular.module('my-app')
.controller('HomeController', function($scope) {
    $scope.test_d = [1,2,3,4,5,6,7,8,9];
})
.controller('CooperationController', function($scope,$http,$sce,$location,$timeout) {
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
                url: base_url+'cooprate_info/HamiDaMin23QZYTRRE782'
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.cooprate_info = response.data;
                            $scope.description = $sce.trustAsHtml( $scope.cooprate_info[0].text);
                              
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });  
    
       if(localStorage.getItem('user_id')){
         $timeout(function(){
               document.getElementById('name').value = localStorage.getItem('name') ;
               document.getElementById('phone').value = localStorage.getItem('phone') ;
            }); 
       }
    
     
     
       $scope.submit = function () {
           
                $scope.name =  document.getElementById('name').value; 
                $scope.phone = document.getElementById('phone').value; 
                $scope.title = document.getElementById('title').value; 
                $scope.text = document.getElementById('text').value; 
            
             if($scope.name == '' || $scope.phone == '' || $scope.title == ''  || $scope.text == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'لطفا تمامی فیلد ها را پر کنید'
                });
                return false;
             }
            document.getElementById('loading').removeAttribute('style');     
             
              $http({
                method: 'POST',
                url: base_url+'cooperate/HamiDaMin23QZYTRRE782',
                data: $.param({name: $scope.name ,phone : $scope.phone, title : $scope.title, text : $scope.text}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data == 1)
                            {
                                     ons.notification.alert({
                                                title: 'پیام',
                                                buttonLabel:"بستن" ,
                                                message: 'درخواست شما با موفقیت ارسال شد'
                                            });
                            }
                            else
                            {
                                 ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
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
       };//end submit
})
.controller('AboutController', function($scope,$http,$location,$sce) {
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
                url: base_url+'about/HamiDaMin23QZYTRRE782',
             }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.about = response.data;
                            $scope.description = $sce.trustAsHtml( $scope.about[0].text);
                            $scope.base_img = base_img + 'about-small/' +  $scope.about[0].picname;
                        
                     }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });  
    
})
.controller('ContactController', function($scope,$http,$location,$timeout) {
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
                url: base_url+'contact_info/HamiDaMin23QZYTRRE782'
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.contact_info = response.data;
                              
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 });  
     
      if(localStorage.getItem('user_id')){
         $timeout(function(){
               document.getElementById('name').value = localStorage.getItem('name') ;
               document.getElementById('phone_or_email').value = localStorage.getItem('email') ;
               document.getElementById('phone').value = localStorage.getItem('phone') ;
            }); 
      } 
     
     
       $scope.submit = function () {
           
           
            $scope.name = document.getElementById('name').value;
            $scope.phone_or_email = document.getElementById('phone_or_email').value;
            $scope.title = document.getElementById('title').value;
            $scope.phone = document.getElementById('phone').value;
            $scope.text = document.getElementById('text').value;
           
             if($scope.name == '' || $scope.phone_or_mail == '' || $scope.title == ''  || $scope.text == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'لطفا تمامی فیلد ها را پر کنید'
                });
                return false;
             }
            var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/; 
            if( !EMAIL_REGEXP.test($scope.phone_or_email ))
            {
                 ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'ایمیل وارد شده معتبر نیست'
                });
                return false;
            }
            
            document.getElementById('loading').removeAttribute('style');     
             
              $http({
                method: 'POST',
                url: base_url+'contact/HamiDaMin23QZYTRRE782',
                data: $.param({name: $scope.name , phone : $scope.phone ,phone_or_email : $scope.phone_or_email, title : $scope.title, text : $scope.text}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data == 1)
                            {
                                     ons.notification.alert({
                                                title: 'پیام',
                                                buttonLabel:"بستن" ,
                                                message: 'پیام شما با موفقیت ارسال شد'
                                            });
                            }
                            else
                            {
                                 ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
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
       };//end submit
})
  
