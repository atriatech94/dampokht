angular.module('my-app') 
.controller('RegisterController', function($scope,$http,$location) {
              if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  

          $scope.go = function ( path ) {$location.path( path )};
           $scope.hback=function(){window.history.back()};
    
         
           
        $scope.submit = function () {
            
            $scope.Name =  document.getElementById('Name').value;
            $scope.email =  document.getElementById('email').value;
            $scope.phone =  document.getElementById('phone').value;
            $scope.password =  document.getElementById('password').value;
            $scope.ConfPassword =  document.getElementById('ConfPassword').value;
           
             if($scope.Name == '' || $scope.phone == '' || $scope.password == ''  || $scope.ConfPassword == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'لطفا تمامی فیلد های اجباری را پر کنید'
                });
                return false;
             }
             
             var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           if($scope.email != ""){
                if(!re.test($scope.email))
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن " ,
                        message: 'ایمیل وارد شده معتبر نیست !!'
                    });
                    return false;
                } 
            }
             $scope.phone = Number($scope.phone);
             if($scope.phone.toString().length != 10  )
             {
              
                ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'تلفن همراه معتبر نیست !!'
                });
                return false;
             } 
             if( $scope.password.length < 6)
             { 
                 ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'کلمه عبور حداقل باید 6 کاراکتر باشد !!'
                });
                return false;
             } 
             
               if($scope.password != $scope.ConfPassword)
             { 
                 ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'کلمه عبور با تکرار آن مطابقت ندارد !!'
                });
                return false;
             } 
           
             document.getElementById('loading').removeAttribute('style');     
             
              $http({
                method: 'POST',
                url: base_url+'register/HamiDaMin23QZYTRRE782',
                data: $.param({name: $scope.Name ,email : $scope.email, phone : Number($scope.phone), password : $scope.password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data == 0)
                            {
                                   ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'ایمیل یا شماره تلفن در سیستم موجود است !!'
                                    });
                                   return false;  
                            }
                            else
                            {
                                $scope.user_info = response.data;
                                localStorage.setItem('user_id',$scope.user_info.customer_id);
                                localStorage.setItem('name',$scope.user_info.name);
                                localStorage.setItem('default_branch',0);
                                localStorage.setItem('email',$scope.user_info.email);
                                localStorage.setItem('phone',$scope.user_info.phone);
                                localStorage.setItem('notification',1);
                                localStorage.setItem('sms',1);
                                localStorage.setItem('home_phone',"");
                                localStorage.setItem('address',JSON.stringify($scope.user_info.address));
                                localStorage.setItem('verification',0);
                                localStorage.setItem('whishlist',JSON.stringify([]));
                                /* register for push */
                               if(localStorage.getItem('reg_id')){
                                    $http({
                                        method: 'POST',
                                        url: base_url+'reg_id/HDaMin2dsaZ3QZYTRRE782',
                                        data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                    }).then(function successCallback(response) {
                                        localStorage.setItem('has_reg_id',1);  
                                    });   
                                    }
                                    else{
                                    app1.initialize();  
                                }
                                /* end register for push */
                                if(localStorage.getItem('verification') == 0){
                                    localStorage.removeItem('user_id');
                                    localStorage.setItem('user_id_temmp',$scope.user_info.customer_id);
                                    $location.path("/verification");
                                }
                                else{
                                  $location.path("/home");
                                }
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
});
