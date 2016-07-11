angular.module('my-app')
.controller('LoginController', function($scope,$location,$http) {
    if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  


    if(localStorage.getItem('user_id'))
    {
        $location.path("/home");
    }  
 
             
    $scope.go = function ( path ) {$location.path( path )};
    $scope.hback=function(){window.history.back()};
    
    $scope.submit = function () {
         $scope.user = document.getElementById('username').value;
         $scope.password = document.getElementById('password').value;
        if($scope.user == '' ||  $scope.password == '')
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: 'نام کاربری و رمز عبور را وارد کنید !!'
            });
                    
        }
        else
        {
                       
            document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'POST',
                url: base_url+'login/HDaMin2dsaZ3QZYTRRE782',
                data: $.param({email: $scope.user , phone : Number($scope.user) , password : $scope.password}),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                if(response.data == 0)
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن" ,
                        message: 'نام کاربری یا رمز عبور اشتباه است !!'
                    });
                    return false;  
                }
                else
                {
                    $scope.user_info = response.data;
                    localStorage.setItem('user_id',$scope.user_info.customer_id);
                    localStorage.setItem('name',$scope.user_info.name);
                    localStorage.setItem('email',$scope.user_info.email);
                    localStorage.setItem('default_branch',$scope.user_info.default_branch);
                    localStorage.setItem('notification',$scope.user_info.notification);
                    localStorage.setItem('sms',$scope.user_info.sms);
                    localStorage.setItem('phone',$scope.user_info.phone);
                    localStorage.setItem('picname',$scope.user_info.picname);
                    localStorage.setItem('home_phone',$scope.user_info.home_phone);
                    localStorage.setItem('address',JSON.stringify($scope.user_info.address));
                    localStorage.setItem('whishlist',JSON.stringify($scope.user_info.whishlist));
                   
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
                    $location.path("/home");
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
        }
                
             
    };
})
.controller('forgetController', function($scope,$location,$http) {
      $scope.go = function ( path ) {$location.path( path )};
      $scope.submit = function () {
         $scope.user = document.getElementById('username').value;
        if($scope.user == '')
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: '  شماره تلفن یا ایمیل خود را وارد کنید !!'
            });
                    
        }
        else
        {
                       
            document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'POST',
                url: base_url+'forget_pass/HDaMin2dsaZ3QZYTRRE782',
                data: $.param({email: $scope.user , phone : Number($scope.user) }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                if(response.data == 0)
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن" ,
                        message: 'ایمیل یا شماره تلفن در سیستم موجود نیست !!'
                    });
                    return false;  
                }
                 else if(response.data == 2)
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن" ,
                        message: 'حداقل زمان بین 2 درخواست بازیابی کلمه عبور 10 دقیقه می باشد'
                    });
                    return false;  
                }
                 else if(response.data == 3)
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن" ,
                        message: 'حداکثر تعداد درخواست بازیابی کلمه عبور در یک روز 5 بار می باشد'
                    });
                    return false;  
                }
               else if(response.data == 4)
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن" ,
                        message: 'خطا در برقراری ارتباط دوباره تلاش کنید '
                    });
                    return false;  
                }
                else
                { 
                   localStorage.setItem('forgot_user_id',response.data.id);
                   $location.path('/verify_code');
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
        }
                
             
    };

})
.controller('verifyController', function($scope,$location,$http) {
      $scope.forgot_user_id = localStorage.getItem('forgot_user_id');
      $scope.go = function ( path ) {$location.path( path )};
      var smsInboxPlugin = cordova.require('cordova/plugin/smsinboxplugin');
      smsInboxPlugin.startReception (function(msg) {
            alert(msg);
        }, function() {
            alert("Error while receiving messages");
        });
      $scope.submit = function () {
         $scope.user = document.getElementById('username').value;
         $scope.password = document.getElementById('password').value;
         $scope.confpassword = document.getElementById('confpassword').value;
        if($scope.user == '')
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: '  کد بازیابی ارسال شده به ایمیل یا تلفن همراه را وارد کنید !!'
            });
                    
        }
        else if($scope.password == '')
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: '  کلمه عبور را وارد کنید !!'
            });
                    
        }
        else if($scope.confpassword == '')
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: '  تکرار کلمه عبور را وارد کنید !!'
            });
                    
        }
        else if($scope.password.length < 6)
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: '  طول کلمه عبور حداقل باید 6 کاراکتر باشد  !!'
            });
                    
        }
        else if($scope.confpassword != $scope.password)
        {
            ons.notification.alert({
                title: 'خطا',
                buttonLabel:"بستن " ,
                message: '  کلمه عبور جدید با تکرار آن مطابقت ندارد !!'
            });
                    
        }
        else
        {
                       
            document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'POST',
                url: base_url+'forget_change_pass/HDaMin2dsaZ3QZYTRRE782',
                data: $.param({code: $scope.user , password : $scope.password , user_id: $scope.forgot_user_id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                document.getElementById('loading').setAttribute('style','display:none;'); 
                if(response.data == 0)
                {
                    ons.notification.alert({
                        title: 'خطا',
                        buttonLabel:"بستن" ,
                        message: 'کد بازیابی وارد شده معتبر نیست !!'
                    });
                    return false;  
                }
                else
                { 
                    ons.notification.alert({
                        title: 'پیام',
                        buttonLabel:"بستن" ,
                        message: 'رمز عبور شما با موفقیت تغییر کرد'
                    }); 
                   localStorage.removeItem('forgot_user_id');
                   $location.path('/login');
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
        }
      };

});