angular.module('my-app') 
.controller('MyprofileController',function($scope,$location,$http,$rootScope){
      if(localStorage.getItem('cart')){
             $scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             $scope.basket_size = 0; 
          }  
     if(!localStorage.getItem('user_id'))
        {
            $location.path("/home");
        }
       
         $scope.base_img = base_img + 'profile/' ;
         $scope.name = localStorage.getItem('name');
         $scope.email = localStorage.getItem('email');
         $scope.picname = "";
          $scope.exit = function () {
              $http({
                        method: 'POST',
                        url: base_url+'unreg_id/HDaMin2dsaZ3QZYTRRE782',
                        data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id')}),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   });
               localStorage.clear(); 
               $location.path("/home");
          };
          document.getElementById('loading').removeAttribute('style');   
          $http({
                method: 'POST',
                url: base_url+'profile/HamiDaMin23QZYTRRE782',
                data: $.param({
                   user_id :  localStorage.getItem('user_id')
                   }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                                  document.getElementById('loading').setAttribute('style','display:none;'); 
                                  $scope.profile = response.data.profile;
                                  $scope.picname = response.data.profile[0].picname;
                                  localStorage.setItem('picname',$scope.picname);
                                  $rootScope.count_o = response.data.orders[0].c;
                                  $rootScope.count_t = response.data.ticket[0].c;
                                       
                          }, function errorCallback(response) {
                              document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        return false;
                 });
         
          $scope.go = function ( path ) {
              $location.path( path );
          };
          
            $scope.go1 = function ( path ) {
               document.getElementById('loading').removeAttribute('style');     
              $location.path( path );
          };
       
    
})
.controller('SettingController',function($scope,$location,$http){
  
    $scope.go = function ( path ) {
              $location.path( path );
          };
       $scope.name = localStorage.getItem('name');
       $scope.sms1 = localStorage.getItem('sms');
      if($scope.sms1 == 0){
           $scope.sms1 = false;
       }
       else{
          $scope.sms1 = true; 
       }
       $scope.notification1 = localStorage.getItem('notification');
       if($scope.notification1  == 0){
           $scope.notification1 = false;
       }
       else{
           $scope.notification1 = true; 
       }
       $scope.picname = localStorage.getItem('picname');
       $scope.base_img = base_img + 'profile/' ;
       
        $scope.sms = function ( ) {
             
              if($scope.sms1 == true){
                   $scope.sms_result = 0;
                   $scope.sms1 = false;
                }
                else{
                   $scope.sms_result = 1;
                   $scope.sms1 = true;
                }
                $http({
                method: 'POST',
                url: base_url+'sms_change/HamiDaMin23QZYTRRE782',
                data: $.param({
                   user_id :  localStorage.getItem('user_id'),
                   sms :  $scope.sms_result
                   }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
               }).then(function successCallback(response) {
                          localStorage.setItem('sms', $scope.sms_result);      
                                       
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
          
        $scope.notification = function ( ) {
              if($scope.notification1 == true){
                   $scope.notification_result = 0;
                   $scope.notification1 = false;
                }
                else{
                   $scope.notification_result = 1;
                   $scope.notification1 = true;
                }
                $http({
                method: 'POST',
                url: base_url+'notification_change/HamiDaMin23QZYTRRE782',
                data: $.param({
                   user_id :  localStorage.getItem('user_id'),
                   notification :  $scope.notification_result
                   }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
               }).then(function successCallback(response) {
                          localStorage.setItem('notification', $scope.notification_result);      
                                       
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
          
           $scope.exit = function () {
             $http({
                        method: 'POST',
                        url: base_url+'unreg_id/HDaMin2dsaZ3QZYTRRE782',
                        data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id')}),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                   });
               localStorage.clear();
               $location.path("/home");
          };
})
.controller('ChangepassController',function($location,$scope,$http){
  
      $scope.go = function ( path ) {
              $location.path( path );
          };  
     
      $scope.submit = function () {
        
         $scope.current_pass = document.getElementById('current_pass').value;
         $scope.new_pass = document.getElementById('new_pass').value;
         $scope.new_conf_pass = document.getElementById('new_conf_pass').value;
        
       if($scope.current_pass == '' ||  $scope.new_pass == '' || $scope.new_conf_pass == '' )
              {
                   ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'لطفا تمامی فیلد ها را پر کنید !!'
                });
                return false;
                  
              }
              
            if( $scope.new_pass.length < 6)
             { 
                 ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'کلمه عبور جدید حداقل باید 6 کاراکتر باشد !!'
                });
                return false;
             } 
             
               if($scope.new_pass != $scope.new_conf_pass)
             { 
                 ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'کلمه عبور جدید با تکرار آن مطابقت ندارد !!'
                });
                return false;
             } 
                
                 document.getElementById('loading').removeAttribute('style');     
                    $http({
                        method: 'POST',
                        url: base_url+'change_pass/HDaMin2dsaZ3QZYTRRE782',
                        data: $.param({current_pass: $scope.current_pass , new_pass : $scope.new_pass , user_id : localStorage.getItem('user_id')}),
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function successCallback(response) {
                                    document.getElementById('loading').setAttribute('style','display:none;'); 
                                    if(response.data == 0)
                                    {
                                        ons.notification.alert({
                                                title: 'خطا',
                                                buttonLabel:"بستن" ,
                                                message: 'رمز عبور فعلی اشتباه وارد شده است !!'
                                            });
                                        return false;  
                                    }
                                    else if(response.data == 1)
                                    {
                                         ons.notification.alert({
                                                title: 'پیام',
                                                buttonLabel:"بستن" ,
                                                message: 'کلمه عبور با موفقیت تغییر کرد'
                                            });
                                            $location.path('/myprofile/setting');
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
              
             
          };    
          
})
.controller('ChangeinfoController',function($location,$scope,$http,$timeout){
  
     $scope.go = function ( path ) {
              $location.path( path );
          }; 
    $timeout(function() {
          document.getElementById('name').value = localStorage.getItem('name'); 
          document.getElementById('email').value = localStorage.getItem('email'); 
          document.getElementById('phone').value = Number(localStorage.getItem('phone')); 
          if(localStorage.getItem('home_phone'))
          document.getElementById('home_phone').value = localStorage.getItem('home_phone');
     });     
       
      
        $scope.submit = function () {
                $scope.name =  document.getElementById('name').value;
                $scope.email = document.getElementById('email').value;
                $scope.phone = Number(document.getElementById('phone').value);
                $scope.home_phone = document.getElementById('home_phone').value;
                $scope.current_pass = document.getElementById('current_pass').value;
            if($scope.name == '' || $scope.phone == '' || $scope.current_pass == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'لطفا  فیلد های نام، تلفن همراه ، کلمه عبور فعلی را پر کنید'
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
           if($scope.phone.toString().length != 10 && $scope.phone.toString().length != 11 )
             {
              
                ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'شماره تلفن همراه وارد شده معتبر نیست !!'
                });
                return false;
             } 
             
              document.getElementById('loading').removeAttribute('style');     
             
              $http({
                method: 'POST',
                url: base_url+'profile_edit/HamiDaMin23QZYTRRE782',
                data: $.param({
                     name: $scope.name ,
                     email : $scope.email,
                     phone : $scope.phone,
                     home_phone : $scope.home_phone,
                     current_pass : $scope.current_pass,
                     old_email : localStorage.getItem('email') ,
                     old_phone : Number(localStorage.getItem('phone')),
                     user_id :  localStorage.getItem('user_id')
                    }),
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
                            else if(response.data == 1)
                            {
                                ons.notification.alert({
                                                title: 'خطا',
                                                buttonLabel:"بستن" ,
                                                message: 'رمز عبور فعلی اشتباه وارد شده است !!'
                                            });
                                   return false;  
                            }
                            else if (response.data.done == 1)
                            {
                                $scope.user_info = response.data;
                                localStorage.setItem('name',$scope.user_info.name);
                                localStorage.setItem('email',$scope.user_info.email);
                                localStorage.setItem('phone',$scope.user_info.phone);
                                localStorage.setItem('home_phone',$scope.user_info.home_phone);
                                ons.notification.alert({
                                                title: 'پیام',
                                                buttonLabel:"بستن" ,
                                                message: 'اطلاعات با موفقیت ویرایش شد'
                                            });
                                        $location.path('/myprofile/setting');     
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
.controller('AddressController',function($scope,$location,$rootScope,$http){
   $scope.go = function ( path ) {
              $location.path( path );
          };
     $scope.addressses =  JSON.parse(localStorage.getItem('address'));
     $scope.delete_address = function ( address_id ) {
         
            ons.notification.confirm({
                    title : "پیام",
                    message: 'برای حذف آدرس اطمینان دارید ؟',
                    buttonLabels : ['خیر','بلی'],
                        callback: function(idx) {
                            switch (idx) {
                                case 0:
                                       
                                    break;
                                case 1:
                                   $scope.do_remove(address_id);
                                   break;
                        }
                    }
           });
         
          }; 
          
        $scope.do_remove = function ( address_id ){
         document.getElementById('loading').removeAttribute('style');       
           $http({
                method: 'POST',
                url: base_url+'delete_address/HamiDaMin23QZYTRRE782',
                data: $.param({ 
                    address_id :  address_id,
                    user_id : localStorage.getItem('user_id')
                 }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data == 1)
                            {
                                 for(var i = 0 ; i <  $scope.addressses.length;  i++) {
                                    if($scope.addressses[i].id == address_id)
                                    {
                                         $scope.addressses.splice(i,1);
                                         localStorage.setItem('address',JSON.stringify( $scope.addressses));
                                         break;
                                    }
                                     
                                 }
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
    };          
})
.controller('EditAddressController',function($scope,$location,$routeParams,$http,$filter,$rootScope){
    
    $scope.go = function ( path ) {
              $location.path( path );
          };
    $scope.branch_area = '';
    $scope.area2 = '';
    $scope.branch = '';
 
    document.getElementById('loading').removeAttribute('style');   
       $http({
                method: 'POST',
                url: base_url+'edit_address_info/HamiDaMin23QZYTRRE782',
                data: $.param({ address_id :  $routeParams.id }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data.done == 1)
                            {
                                 $scope.areas = response.data.areas;
                                 $scope.branches = response.data.branches;
                                 $scope.my_address = response.data.customer_address;
                                 $scope.temp_area = $filter('filter')($scope.areas,{id:$scope.my_address[0].area_id},true);
                                 $scope.branch_area = $filter('filter')($scope.areas,{branch_id:$scope.temp_area[0].branch_id},true);
                                 $scope.area2 = $scope.my_address[0].area_id;
                                 $scope.branch = $scope.temp_area[0].branch_id;
                                 $scope.address = $scope.my_address[0].address;
                                 document.getElementById('code_posti').value = $scope.my_address[0].zip_code;

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
                 
        $scope.changeArea = function(branch_id){
          $scope.branch_area = $filter('filter')($scope.areas,{branch_id:branch_id},true);
          $scope.area2 = ""; 
         
     };    
     
       $scope.submit = function () {
            $scope.code_posti =  document.getElementById('code_posti').value;
            $scope.address = document.getElementById('textarea1').value; 
            $scope.area2 = document.getElementById('area').value.split(":")[1]; 
            if($scope.area2 === undefined )
              $scope.area2 = "";
           
             if($scope.branch == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'شعبه را انتخاب کنید'
                });
                return false;
             }
              if($scope.area2 == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'محدوده را انتخاب کنید'
                });
                return false;
             }
              if($scope.address == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'آدرس را وارد کنید'
                });
                return false;
             }
            document.getElementById('loading').removeAttribute('style');     
             
              $http({
                method: 'POST',
                url: base_url+'edit_address/HamiDaMin23QZYTRRE782',
                data: $.param({
                     area_id: $scope.area2 ,
                     zip_code : $scope.code_posti,
                     address : $scope.address,
                     address_id :  $routeParams.id
                    }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if (response.data == 1)
                            {
                               var addresses = JSON.parse(localStorage.getItem('address'));
                               var index = addresses.map(function (item) {
                                    return item.id;
                                }).indexOf($routeParams.id);
                               addresses[index] = ({id:$routeParams.id , address : $scope.address , branch_id: $scope.branch , type:1});
                               localStorage.setItem('address',JSON.stringify(addresses));
                                ons.notification.alert({
                                                title: 'پیام',
                                                buttonLabel:"بستن" ,
                                                message: 'آدرس با موفقیت ویرایش شد'
                                            });
                                 $location.path('/myprofile/address');           
                                            
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


.controller('NewaddressController',function($http,$scope,$filter,$location,$rootScope){
    $scope.go = function ( path ) {
              $location.path( path );
          };
    
     $scope.address_info = {};  
     $scope.address_info.branch_area = '';
     $scope.address_info.area = '';
     $scope.address_info.branch = '';
     $scope.address_info.address1 = '';
    
     document.getElementById('loading').removeAttribute('style');     
          $http({
                method: 'GET',
                url: base_url+'new_address/HamiDaMin23QZYTRRE782',
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data.done == 1)
                            {
                                $scope.areas = response.data.areas;
                                $scope.branches_a = response.data.branches;
                                $rootScope.branches =  $scope.branches_a;
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
    
    $scope.changeArea = function(branch_id){
        $scope.address_info.branch_area = $filter('filter')($scope.areas,{branch_id:branch_id},true);
        $scope.address_info.area = ''; 
     }; 
     
      $scope.submit_add1 = function () {
           $scope.address_info.code_posti = document.getElementById('code_posti').value;
            if($scope.address_info.branch == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'شعبه را انتخاب کنید'
                });
                return false;
             }
              if($scope.address_info.area == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'محدوده را انتخاب کنید'
                });
                return false;
             }
             if($scope.address_info.address1 == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'آدرس را وارد کنید'
                });
                return false;
             }
            document.getElementById('loading').removeAttribute('style');     
             
              $http({
                method: 'POST',
                url: base_url+'add_new_address/HamiDaMin23QZYTRRE782',
                data: $.param({
                     area_id:   $scope.address_info.area ,
                     zip_code : $scope.address_info.code_posti,
                     address :  $scope.address_info.address1,
                     user_id :  localStorage.getItem('user_id')
                    }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if (response.data != 0)
                            {
                               var addresses = JSON.parse(localStorage.getItem('address'));
                               addresses.push({id:response.data , address : $scope.address_info.address1 , branch_id : $scope.address_info.branch , type: 1 });
                               localStorage.setItem('address',JSON.stringify(addresses));
                                ons.notification.alert({
                                                title: 'پیام',
                                                buttonLabel:"بستن" ,
                                                message: 'آدرس با موفقیت ثبت شد'
                                            });
                                 $location.path('/myprofile/address');           
                                            
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


.controller('chargeController',function($location,$scope,$http){
  
      $scope.go = function ( path ) { $location.path( path ); };
     
      document.getElementById('loading').removeAttribute('style');     
            $http({
                method: 'GET',
                url: base_url+'charj/HamiDaMin23QZYTRRE782'
               }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            $scope.charj = response.data;
                               
                        }, function errorCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'خطا در برقراری ارتباط دوباره تلاش کنید !!'
                           });
                        
                 }); 
      
       $scope.submit = function(){
            $scope.user_price = document.getElementById('user_price').value;
          if( $scope.user_price == ""){
               ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'لطفا مبلغ را وارد کنید'
                           });
              return false;             
          } 
        if(  isNaN (Number($scope.user_price)) ){
              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'مبلغ وارد شده معتبر نیست'
                           });
              return false;
        }
        
         if(  Number($scope.user_price) < 500 ){
              ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'حداقل مبلغ شارژ 500 تومان است'
                           });
              return false;
        }
       /* okey */ 
     };                
     
       $scope.buy = function(id){
             alert(id); 
          
       };         
})

.controller('supportController',function($http,$scope,$q,$location,$rootScope,$route){
 
   document.getElementById('loading').setAttribute('style','display:none;'); 
   $scope.go = function ( path ) {$location.path( path );};
   $scope.detail = function (id){
       if(id != '-1')
         $location.path( '/myprofile/support_detail/'+id );
     };
     
     $scope.refresh = function(){
        document.getElementById('loading').removeAttribute('style');     
        $route.reload();
    }; 
    $scope.MyDelegate = {
      configureItemScope: function(index, itemScope) {
        if (!itemScope.item) {
         itemScope.canceler = $q.defer();
         itemScope.item = {
            date: '',
            subject: '',
            status: 'در حال بررسی' ,
            id: '-1'
          };
          $http.get( base_url+'profile_ticket/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+index, {
            timeout: itemScope.canceler.promise
          }).success(function(data) {
            itemScope.item.date = data[0].date;
            itemScope.item.subject = data[0].subject;
            itemScope.item.id = data[0].id;
            itemScope.item.status = data[0].status;
            
           }).error(function() {
              itemScope.item.subject = "خطا در برقراری ارتباط";
              itemScope.item.date = "Error";
              itemScope.item.id = "-1";
          
          });
        }
      },
      calculateItemHeight: function(index) {
        return 100;
      },
      countItems: function() {
          if($rootScope.count_t)
           return Number( $rootScope.count_t );
          else
           return  0;
      },
      destroyItemScope: function(index, itemScope) {
        itemScope.canceler.resolve();
        
      }
    };
    
       
})
.controller('supportdetailController',function($http,$scope,$location,$routeParams,$sce){
  
    $scope.id = $routeParams.id;
    $scope.go = function ( path ) {
         document.getElementById('loading').removeAttribute('style');    
         $location.path( path );
     };
    
     $scope.base_img = base_img + 'profile/' ;
     $scope.base_img_a = base_img_a + 'admin/uploads/profile/' ;
     document.getElementById('loading').removeAttribute('style');    
     $http({
                method: 'GET',
                url: base_url+'ticket_detail/HamiDaMin23QZYTRRE782/'+$routeParams.id,
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data.done == 1)
                            {
                               $scope.tickets = response.data.support;
                                for(var i=0 ; i < $scope.tickets.length ; i++ ){
                                   $scope.tickets[i].messages = $sce.trustAsHtml( $scope.tickets[i].message);
                               }
                                 
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
    
     $scope.showDialog = function(id) {
        document.getElementById(id).show();
    };

    $scope.hideDialog = function(id) {
        document.getElementById(id).hide();
    };
   
    
    $scope.send_answer = function(id) {
        $scope.text = document.getElementById('text_a').value; 
         $scope.ticket_id = $scope.id;
          if($scope.text == ""){
               ons.notification.alert({
                                        title: 'خطا',
                                        buttonLabel:"بستن " ,
                                        message: 'لطفا پاسخ خود را بنویسید !!'
                                });
               return false;                 
          }
          
          document.getElementById(id).hide();
          document.getElementById('loading').removeAttribute('style');   
          $http({
                method: 'POST',
                url: base_url+'ticket_answer/HamiDaMin23QZYTRRE782',
                data: $.param({
                   user_id :  localStorage.getItem('user_id'),
                   ticket_id :   $scope.ticket_id,
                   text :  $scope.text
                   }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                                    ons.notification.alert({
                                        title: 'پیام سیستم',
                                        buttonLabel:"بستن " ,
                                        message: 'پاسخ شما با موفقیت ثبت شد.'
                                 });
                                  $location.path('myprofile/support' );
                                 
                                  
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
.controller('supportnewController',function($scope,$location,$http,$rootScope){
  $scope.go = function ( path ) {$location.path( path );};
 
    document.getElementById('loading').removeAttribute('style');    
     $http({
                method: 'GET',
                url: base_url+'ticket_new/HamiDaMin23QZYTRRE782',
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data.done == 1)
                            {
                               $scope.units = response.data.units;
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
    
       $scope.submit = function(){
           
           $scope.unit_choose =  document.getElementById('unit_choose').value;
           $scope.priority =  document.getElementById('priority').value;
           $scope.message =  document.getElementById('message').value;
           $scope.subject =  document.getElementById('subject').value;  
           
           if($scope.subject == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'عنوان را بنویسید'
                });
                return false;
             }
           
             if($scope.unit_choose == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'بخش مربوطه را انتخاب کنید'
                });
                return false;
             }
              if($scope.priority == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'اولویت را انتخاب کنید'
                });
                return false;
             }
             
               if($scope.message == ''){
                  ons.notification.alert({
                     title: 'خطا',
                     buttonLabel:"بستن " ,
                     message: 'درخواست خود را بنویسید'
                });
                return false;
             }
              
            document.getElementById('loading').removeAttribute('style');     
              $http({
                method: 'POST',
                url: base_url+'add_ticket/HamiDaMin23QZYTRRE782',
                data: $.param({
                        subject: $scope.subject ,
                        unit: $scope.unit_choose ,
                        priority : $scope.priority,
                        message : $scope.message,
                        user_id :  localStorage.getItem('user_id')
                    }),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(response) {
                          ons.notification.alert({
                                title: 'پیام سیستم',
                                buttonLabel:"بستن " ,
                                message: 'درخواست شما با موفقیت ثبت شد.'
                           }); 
                           if( $rootScope.count_t != null)
                             $rootScope.count_t = Number($rootScope.count_t) + 1;
                           else
                               $rootScope.count_t = 1;  
                            
                           $location.path('myprofile/support' );
                           
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
.controller('OrderlistController',function($http,$scope,$q,$location,$rootScope,$route){
  
     document.getElementById('loading').setAttribute('style','display:none;'); 
     $scope.detail = function (id){
        if(id != '-1')
         $location.path( '/myprofile/order_detail/'+id );
     };
     $scope.go = function ( path ) {
         
         $location.path( path );
     };
     $scope.MyDelegate = {
      configureItemScope: function(index, itemScope) {
        if (!itemScope.item) {
         itemScope.canceler = $q.defer();
         itemScope.item = {
            price : 0,
            date: '',
            name: '',
            order_status: 'در حال بررسی' ,
            id: '-1'
          };
          $http.get( base_url+'profile_orders/HamiDaMin23QZYTRRE782/'+localStorage.getItem('user_id')+'/'+index, {
            timeout: itemScope.canceler.promise
          }).success(function(data) {
            console.log(data);
            itemScope.item.date = data[0].date;
            itemScope.item.price = data[0].final_price;
            itemScope.item.id = data[0].id;
            itemScope.item.name = data[0].name;
            itemScope.item.order_status = data[0].order_status;
           
          
          }).error(function() {
              itemScope.item.date = "خطا در برقراری ارتباط";
              itemScope.item.name = "Error";
              itemScope.item.id = "-1";
             
          
          });
        }
      },
      calculateItemHeight: function(index) {
        return 95;
      },
      countItems: function() {
          if($rootScope.count_o)
           return Number($rootScope.count_o);
          else
           return 0;
      },
      destroyItemScope: function(index, itemScope) {
        itemScope.canceler.resolve();
        
      }
    };
    
    $scope.refresh = function(){
        document.getElementById('loading').removeAttribute('style');     
        $route.reload();
    };
    
})

.controller('OrderdetailController',function($scope,$location,$http,$routeParams){
     $scope.go = function ( path ) {
         document.getElementById('loading').removeAttribute('style');    
         $location.path( path );
     };
    
     document.getElementById('loading').removeAttribute('style');    
     $http({
                method: 'GET',
                url: base_url+'order_detail/HamiDaMin23QZYTRRE782/'+$routeParams.id+'/'+localStorage.getItem('user_id'),
            }).then(function successCallback(response) {
                            document.getElementById('loading').setAttribute('style','display:none;'); 
                            if(response.data.done == 1)
                            {
                               $scope.order = response.data.order;
                               $scope.order_detail = response.data.order_detail;
                               $scope.address = response.data.address;
                                  
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
        
        
        
});


