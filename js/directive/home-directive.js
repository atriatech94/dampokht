angular.module('my-app')
.directive('swiperDir' , function ($timeout){
    return {
        link: function() {
            $timeout(function(){
                /*=================================================*/
                $(document).ready(function(){
                    $('ul.tabs').tabs();
                });
                /*=================================================*/
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: false,
                    noSwiping : false,
                });
                $('ul.tabs li').click(function(){
                   
                    swiper.slideTo($(this).index());
                    var li_width = 0;
                    for(i = $('ul.tabs li').length ; i > $(this).index()+1;i-- ){
                        li_width += $('ul.tabs li').eq(i).width();
                    }
                    //console.log(li_width);
                    $('ul.tabs').animate({scrollLeft:   li_width  },500);  

                });
                swiper.on('slideChangeStart', function () {
                    $('ul.tabs').tabs('select_tab', "test"+(parseInt(swiper.activeIndex)+1) );
                });
                /*=================================================*/   
                /*=================================================*/   
             });   
        }
}})

.directive('homeDir' , function ($http,$timeout,$rootScope,$location){
    return {
        link: function(scope) {
          
          
          $timeout(function(){
              if(localStorage.getItem('reg_id') && !localStorage.getItem('has_reg_id')){
                       $http({
                          method: 'POST',
                          url: base_url+'reg_id/HDaMin2dsaZ3QZYTRRE782',
                          data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                       }).then(function successCallback(response) {
                             localStorage.setItem('has_reg_id',1);  
                       });    
                 }
                 else if(!localStorage.getItem('has_reg_id')){
                    $timeout(function(){
                          if(localStorage.getItem('reg_id')  && !localStorage.getItem('has_reg_id')){
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
                             $timeout(function(){  
                                     if(localStorage.getItem('reg_id')  && !localStorage.getItem('has_reg_id')){
                                     $http({
                                        method: 'POST',
                                        url: base_url+'reg_id/HDaMin2dsaZ3QZYTRRE782',
                                        data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                      }).then(function successCallback(response) {
                                        localStorage.setItem('has_reg_id',1);  
                                     });  
                                   }
                                       
                             },6500); 
                              
                          }
                        
                     },2000); 
                 }
          },1500);
          
          
           if(localStorage.getItem('cart')){
             scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             scope.basket_size = 0; 
          } 
          
          
          
          scope.base_img = base_img + 'food-xsmall/' ;
            scope.go = function ( path ) {
                $location.path( path );
            };
          
         if(localStorage.getItem('user_id')){
             scope.login = true;
         } 
         else{
              scope.login = false;
         }
          
         if($rootScope.specials_root == null)
         {
             document.getElementById('loading').removeAttribute('style');   
             $http({
                method: 'GET',
                url: base_url+'home_info/HamiDaMin23QZYTRRE782',
            }).then(function successCallback(response) {
                        document.getElementById('loading').style.display = 'none';       
                            if(response.data.done == 1)
                            {
                                $rootScope.specials_root = response.data.specials;
                                scope.specials = response.data.specials;
                                console.log(scope.specials);
                               $timeout(function(){
                                    $('.owl-carousel_two').owlCarousel({
                                    items:2,
                                    margin:5,
                                    autoHeight:true,
                                    nav:false,
                                    dots:false,
                                    rtl:true,
                                });
                                  
                                   
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
                             document.getElementById('loading').style.display = 'none';   
                             ons.notification.alert({
                                title: 'خطا',
                                buttonLabel:"بستن " ,
                                message: 'لطفا اینترنت خود را چک کنید !!'
                           });
                        return false;
                 }); 
         } 
         else
         {
              scope.specials =  $rootScope.specials_root;
               $timeout(function(){
                    $('.owl-carousel_two').owlCarousel({
                    items:2,
                    margin:5,
                    autoHeight:true,
                    nav:false,
                    dots:false,
                    rtl:true,
                });
              }); 
         }
        
        }
}})

.directive('favouriteDir' , function ($http,$location){
    return {
        link: function(scope) {
          scope.go = function ( path ) {
                $location.path( path );
            };   
       
         if(localStorage.getItem('cart')){
             scope.basket_size = JSON.parse(localStorage.getItem('cart')).length; 
          }
          else{
             scope.basket_size = 0; 
          }  
            
              scope.base_img = base_img + 'food-xsmall/' ;
              document.getElementById('loading').removeAttribute('style');     
              scope.dialogs = {};

      
             scope.show1 = function(dlg) {
                if (!scope.dialogs[dlg]) {
                ons.createDialog(dlg).then(function(dialog) {
                    scope.dialogs[dlg] = dialog;
                    dialog.show();
                });
                } else {
                  scope.dialogs[dlg].show();
                }
            };
       
             
          
         if(localStorage.getItem('user_id') == null)
         {
            document.getElementById('loading').style.display = 'none';  
            scope.show1('navigator.html');
             scope.branches = [];
             
         } 
         else
         {
              $http({
                    method: 'POST',
                    url: base_url+'get_whishlist/HamiDaMin23QZYTRRE782',
                    data: $.param({ user_id : localStorage.getItem('user_id') }),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).then(function successCallback(response) {
                                document.getElementById('loading').setAttribute('style','display:none;'); 
                                if(response.data.done == 1)
                                {
                                    scope.wishes = response.data.wish;
                                    scope.branches = response.data.branch;
                                  
                                    scope.whishlist = [];
                                    for(var i = 0 ; i < scope.wishes.length;  i++) {
                                       scope.whishlist[i] = {food_id : scope.wishes[i].id , branch_id : scope.wishes[i].branch_id };
                                    }
                                   localStorage.setItem('whishlist',JSON.stringify(scope.whishlist));
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
         var timer;
         var timeout = 3000;
             
         scope.add_to_card = function(id,branch_id,picname,price,name,branch_name){
             
              /*==============animation================*/
            var theDiv = document.getElementById("mainList");
			btn = document.createElement("DIV");        // Create a <button> element
			theDiv.appendChild(btn);
			clearTimeout(timer);
			timer = setTimeout(function(){ document.getElementById('mainList').innerHTML=''; } , timeout );
            /*======================================*/
             
            if(localStorage.getItem('cart'))
            {
                scope.cart = JSON.parse(localStorage.getItem('cart'));
                scope.cart_branch = JSON.parse(localStorage.getItem('cart_branch'));
                var find = 0;
                for(var i = 0 ; i < scope.cart.length;  i++) {
                    if (scope.cart[i].id == id && scope.cart[i].branch_id == branch_id ) {
                          scope.cart[i].quantity = parseInt(scope.cart[i].quantity) + 1;
                          find++;
                          localStorage.setItem('cart',JSON.stringify(scope.cart));
                          break;
                     }
                }
                if(find == 0)
                {
                    scope.cart.push({id: id , name : name , branch_id : branch_id , price : price , quantity : 1 , picname : picname });
                     scope.basket_size++;
                    localStorage.setItem('cart',JSON.stringify(scope.cart));
                      find_branch = 0;
                      for(var i = 0 ; i < scope.cart_branch.length;  i++) {
                            if (scope.cart_branch[i].branch_id == branch_id ) {
                                 find_branch++;
                                 break;
                        }
                      }
                    if(find_branch == 0)  {
                         scope.cart_branch.push({ branch_name : branch_name , branch_id : branch_id  });
                         localStorage.setItem('cart_branch',JSON.stringify(scope.cart_branch));
                    }
                }
                
                 
            }
            else
            {
                scope.cart = [{id: id , name : name , branch_id : branch_id , price : price , quantity : 1 , picname : picname }];
                scope.basket_size++;
                scope.cart_branch = [{ branch_name : branch_name , branch_id : branch_id  }];
                localStorage.setItem('cart',JSON.stringify(scope.cart));
                localStorage.setItem('cart_branch',JSON.stringify(scope.cart_branch));
                
            }
            
            
        };
           
          scope.remove = function(food_id,branch_id){
              
              scope.do_remove(food_id,branch_id);
             
        }; 
        
        
                scope.do_remove =  function(food_id,branch_id)
                {
                    var index = -1;
                            for(var i = 0 ; i < scope.wishes.length;  i++) {
                                    if (scope.wishes[i].id == food_id && scope.wishes[i].branch_id == branch_id ) {
                                        index = i;
                                        break;
                                    }
                                }
                        scope.wishes.splice(index,1);
                        scope.whishlist.splice(index,1);
                        localStorage.setItem('whishlist',JSON.stringify(scope.whishlist));
                        if(scope.whishlist.length == 0){
                            scope.branches = [];
                        }
                        
                        $http({
                            method: 'POST',
                            url: base_url+'whishlist/HamiDaMin23QZYTRRE782',
                            data: $.param({ user_id :  localStorage.getItem('user_id') , food_id : food_id , status : 0 ,  branch_id : branch_id }  ),
                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        });  
                };          
                      
         }
           
        }
        
}})


.directive('lightgallery', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
        if (scope.$last) { 
            $('#lightgallery').lightGallery({
                thumbnail:true,
                animateThumb: false,
                showThumbByDefault: false
        });
           
         $('#lightgallery').on('onBeforeOpen.lg',function(event){
               localStorage.setItem('gallery_lg',1);
            }); 
         $('#lightgallery').on('onBeforeClose.lg',function(event){
               localStorage.removeItem('gallery_lg');
            });    
        }
         
    }
  };
})
.directive('dirLink', function($location) {
  return {
      link: function(scope) {
          scope.go = function(path){
                    $location.path( path );
                };
           scope.exit = function(path){
                   navigator.app.exitApp();
                };
           scope.share = function(){
                    var options = {
                            message: 'دمپخت', // not supported on some apps (Facebook, Instagram)
                            subject: 'دمپخت', // fi. for email
                            url: 'http://dampokht.com/'
                        }
                      window.plugins.socialsharing.shareWithOptions(options);
                };      
          if(localStorage.getItem('user_id'))
          {
              scope.login = 1;
          }
          else
          {
              scope.login = 0;
          }

      },
      templateUrl : 'page/hamber_menu/index.html'
    };
})

.directive('quickLogin' , function ($location,$http,$rootScope,$filter,$timeout){
    return {
        link: function(scope) {
           scope.username = '';
           scope.password = '';
           
             scope.submit = function () {
              if(scope.username == '' ||  scope.password == '')
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
                        data: $.param({email: scope.username , phone : Number(scope.username) , password : scope.password}),
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
                                        scope.user_info = response.data;
                                        dialog.hide();
                                        localStorage.setItem('user_id',scope.user_info.customer_id);
                                        localStorage.setItem('name',scope.user_info.name);
                                        localStorage.setItem('email',scope.user_info.email);
                                        localStorage.setItem('phone',scope.user_info.phone);
                                        localStorage.setItem('picname',scope.user_info.picname);
                                        localStorage.setItem('home_phone',scope.user_info.home_phone);
                                        localStorage.setItem('notification',scope.user_info.notification);
                                        localStorage.setItem('sms',scope.user_info.sms);
                                        localStorage.setItem('default_branch',scope.user_info.default_branch);
                                        localStorage.setItem('address',JSON.stringify(scope.user_info.address));
                                        localStorage.setItem('verification',1);
                                        localStorage.setItem('whishlist',JSON.stringify(scope.user_info.whishlist));
                                        $rootScope.user_id_wish = 1;
                                        scope.food_is_whish = $filter('filter')(scope.user_info.whishlist,{food_id : $rootScope.food_wish_id , branch_id : $rootScope.branch_wish_id },true); 
                                         if(scope.food_is_whish.length == 0)
                                        {
                                            $rootScope.icon = 0;
                                        }
                                        else
                                        {
                                            $rootScope.icon = 1;
                                        }
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
                                         
                                           $timeout(function(){
                                                if(localStorage.getItem('reg_id') && !localStorage.getItem('has_reg_id')){
                                                        $http({
                                                            method: 'POST',
                                                            url: base_url+'reg_id/HDaMin2dsaZ3QZYTRRE782',
                                                            data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                                                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                                        }).then(function successCallback(response) {
                                                                localStorage.setItem('has_reg_id',1);  
                                                        });    
                                                    }
                                                    else if(!localStorage.getItem('has_reg_id')){
                                                        $timeout(function(){
                                                            if(localStorage.getItem('reg_id')  && !localStorage.getItem('has_reg_id')){
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
                                                                $timeout(function(){  
                                                                        if(localStorage.getItem('reg_id')  && !localStorage.getItem('has_reg_id')){
                                                                        $http({
                                                                            method: 'POST',
                                                                            url: base_url+'reg_id/HDaMin2dsaZ3QZYTRRE782',
                                                                            data: $.param({token_id: localStorage.getItem('reg_id') , user_id : localStorage.getItem('user_id') , type : 1}),
                                                                            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                                                                        }).then(function successCallback(response) {
                                                                            localStorage.setItem('has_reg_id',1);  
                                                                        });  
                                                                    }
                                                                        
                                                                },6500); 
                                                                
                                                            }
                                                            
                                                        },2000); 
                                                    }
                                            },1500);       
                                         /* end register for push */
                                        
                                       
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
           
           scope.go = function ( path ){
                dialog.hide();
                $location.path( path ); 
               
           }
           
        }
}})


.directive('buybasketDir' , function ($filter,$rootScope,$location){
    return {
        link: function(scope) {
           scope.go = function(path){ $location.path( path );}
           scope.base_img = base_img + 'food-xsmall/' ;
            if(localStorage.getItem('cart'))
            {
                scope.cart = JSON.parse(localStorage.getItem('cart'));
                scope.basket_size =  scope.cart.length; 
                scope.cart_branch = JSON.parse(localStorage.getItem('cart_branch'));
               
                if(scope.cart.length == 0)
                {
                    scope.empty = true;
                }
                else{
                    
                   for(var i=0 ; i<scope.cart_branch.length;i++){
                         scope.cart_branch[i].total = 0; 
                         for ( var j=0 ; j< scope.cart.length ; j++ ){
                             if(scope.cart[j].branch_id == scope.cart_branch[i].branch_id ){
                                 scope.cart_branch[i].total = scope.cart_branch[i].total + ( parseInt(scope.cart[j].price) * parseInt(scope.cart[j].quantity) ); 
                             }
                           }   
                        }
                 }
                   
            }
            else
            {
                scope.empty = true;
                scope.basket_size = 0; 
            }
          
         scope.minesFood = function(id,branch_id){
           
              for(var i = 0 ; i < scope.cart.length;  i++) {
                    if (scope.cart[i].id == id && scope.cart[i].branch_id == branch_id ) {
                          scope.cart[i].quantity = parseInt(scope.cart[i].quantity) - 1;
                           for(var j=0 ; j<scope.cart_branch.length;j++){
                               if( scope.cart_branch[j].branch_id == branch_id )
                                {
                                    scope.cart_branch[j].total =  scope.cart_branch[j].total -  parseInt(scope.cart[i].price);
                                    break;
                                }
                               
                           }
                          if(scope.cart[i].quantity == 0){
                              scope.cart.splice(i,1);
                              scope.basket_size--;
                               var find = 0;
                               for(var i = 0 ; i < scope.cart.length;i++) {
                                  if(scope.cart[i].branch_id == branch_id)
                                  {
                                      find ++;
                                      break;
                                  }
                                   
                               } 
                               if(find == 0)
                               {
                                     for(var i = 0;i < scope.cart_branch.length;i++) {
                                         
                                         if(scope.cart_branch[i].branch_id == branch_id )
                                         {
                                             scope.cart_branch.splice(i,1);
                                             localStorage.setItem('cart_branch',JSON.stringify(scope.cart_branch));
                                             break;
                                         }
                                     }
                               }
                          }
                          if(scope.cart.length == 0)
                            {
                                scope.empty = true;
                            } 
                          localStorage.setItem('cart',JSON.stringify(scope.cart));
                          break;
                     }
                }
          };
          
          scope.plusFood = function(id,branch_id){   
              
                for(var i = 0 ; i < scope.cart.length;  i++) {
                    if (scope.cart[i].id == id && scope.cart[i].branch_id == branch_id ) {
                          scope.cart[i].quantity = parseInt(scope.cart[i].quantity) + 1;
                          localStorage.setItem('cart',JSON.stringify(scope.cart));
                          for(var j=0 ; j<scope.cart_branch.length;j++){
                               if( scope.cart_branch[j].branch_id == branch_id )
                                {
                                    scope.cart_branch[j].total =  scope.cart_branch[j].total +  parseInt(scope.cart[i].price);
                                    break;
                                }
                               
                           }
                          break;
                     }
                }
                
              };
          
          scope.remove_food = function(id,branch_id){
             
              for(var i = 0 ; i < scope.cart.length;  i++) {
                    if (scope.cart[i].id == id && scope.cart[i].branch_id == branch_id ) {
                          for(var j=0 ; j<scope.cart_branch.length;j++){
                            if( scope.cart_branch[j].branch_id == branch_id )
                                {
                                    scope.cart_branch[j].total =  scope.cart_branch[j].total -  (parseInt(scope.cart[i].price) * parseInt(scope.cart[i].quantity) ) ;
                                    break;
                                }
                               
                           }
                          scope.cart.splice(i,1);
                          scope.basket_size--;
                           var find = 0;
                               for(var i = 0 ; i < scope.cart.length;  i++) {
                                  if(scope.cart[i].branch_id == branch_id)
                                  {
                                      find ++;
                                      break;
                                  }
                                   
                               } 
                               if(find == 0)
                               {
                                     for(var i = 0 ; i < scope.cart_branch.length;  i++) {
                                         
                                         if(scope.cart_branch[i].branch_id == branch_id )
                                         {
                                             scope.cart_branch.splice(i,1);
                                             localStorage.setItem('cart_branch',JSON.stringify(scope.cart_branch));
                                             break;
                                         }
                                     }
                               }
                           if(scope.cart.length == 0)
                            {
                                scope.empty = true;
                            }     
                          localStorage.setItem('cart',JSON.stringify(scope.cart));
                          break;
                     }
                }
          };
            
            if(localStorage.getItem('user_id')){
                 $rootScope.user_id_wish = 1;
            } 
            else{
                 $rootScope.user_id_wish = 0;
            }
            scope.dialogs = {};
            scope.show = function(dlg) {
                         if (!scope.dialogs[dlg]) {
                        ons.createDialog(dlg).then(function(dialog) {
                            scope.dialogs[dlg] = dialog;
                            dialog.show();
                        });
                        } else {
                           scope.dialogs[dlg].show();
                        }
                 };
            
            
        }
}});

