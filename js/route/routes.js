angular.module('my-app')
    .config(function($routeProvider) {
        $routeProvider
        .when('/intro', {
            templateUrl: 'page/intro/index.html',
            controller: 'IntroController',
        })
        .when('/', {
            templateUrl: 'page/intro/index.html',
            controller: 'IntroController',
        })
        .when('/home', {
            templateUrl: 'page/home/home.html',
            controller: 'HomeController',
		})
         
        .when('/food_list', {
            templateUrl: 'page/food_list/index.html',
            controller: 'FoodlistController',
		})
       
        .when('/login', {
            templateUrl: 'page/login/index.html',
            controller: 'LoginController',
		})
        .when('/register', {
            templateUrl: 'page/register/index.html',
            controller: 'RegisterController',
		})
        .when('/menu/:id', {
            templateUrl: 'page/menu/index.html',
            controller: 'MenuController',
		})
        .when('/food/:food_id/:branch_id', {
            templateUrl: 'page/menu/food.html',
            controller: 'FoodController',
		})
        .when('/pictures/:food_id/:branch_id', {
            templateUrl: 'page/menu/gallery.html',
            controller: 'GalleryController',
		})
        .when('/myprofile/', {
            templateUrl: 'page/myprofile/index.html',
            controller: 'MyprofileController',
		})
        .when('/myprofile/setting', {
            templateUrl: 'page/myprofile/setting.html',
            controller: 'SettingController',
		})
        .when('/myprofile/change_pass', {
            templateUrl: 'page/myprofile/change_pass.html',
            controller: 'ChangepassController',
		})
        .when('/myprofile/change_info', {
            templateUrl: 'page/myprofile/change_info.html',
            controller: 'ChangeinfoController',
		})
        .when('/myprofile/address', {
            templateUrl: 'page/myprofile/address.html',
            controller: 'AddressController',
		})
        .when('/myprofile/new_address', {
            templateUrl: 'page/myprofile/new_address.html',
            controller: 'NewaddressController',
		})
         .when('/edit_address/:id/:type', {
            templateUrl: 'page/myprofile/edit_address.html',
            controller: 'EditAddressController',
		})
         .when('/edit_address_map/:id/:type', {
            templateUrl: 'page/myprofile/edit_address_map.html'
           
		})
        .when('/cooperation', {
            templateUrl: 'page/other/cooperation.html',
            controller: 'CooperationController',
		})
        .when('/about', {
            templateUrl: 'page/other/about.html',
            controller: 'AboutController',
		})
        .when('/contact', {
            templateUrl: 'page/other/contact.html',
            controller: 'ContactController',
		})
        .when('/law', {
            templateUrl: 'page/other/law.html',
            controller: 'lawController',
		})
        .when('/branch', {
            templateUrl: 'page/branches/index.html',
            controller: 'BranchesController',
		})
         .when('/branches', {
            templateUrl: 'page/branches/branch.html',
            controller: 'BranchController',
		})
        .when('/favourite', {
            templateUrl: 'page/home/favourite.html',
       })
        .when('/cart', {
            templateUrl: 'page/home/cart.html',
       	})
        .when('/comments/:food_id/:branch_id', {
            templateUrl: 'page/menu/comments.html',
            controller: 'commentsController',
		})
        .when('/comment/:food_id/:branch_id', {
            templateUrl: 'page/menu/new_comment.html',
            controller: 'newcommentController',
		})
        .when('/charge/', {
            templateUrl: 'page/myprofile/charge.html',
            controller: 'chargeController',
		})
        .when('/myprofile/support', {
            templateUrl: 'page/myprofile/support.html',
            controller: 'supportController',
		})
        .when('/myprofile/support_detail/:id', {
            templateUrl: 'page/myprofile/support_detail.html',
            controller: 'supportdetailController',
		})
        .when('/myprofile/support_new', { 
            templateUrl: 'page/myprofile/support_new.html',
            controller: 'supportnewController',
		})
        .when('/checkout/:id', {
            templateUrl: 'page/checkout/index.html',
            controller: 'checkoutController',
		})
        .when('/myprofile/order_list', {
            templateUrl: 'page/myprofile/order_list.html',
            controller: 'OrderlistController',
		})
        .when('/myprofile/order_detail/:id', {
            templateUrl: 'page/myprofile/order_detail.html',
            controller: 'OrderdetailController',
		})
        .when('/faq', {
            templateUrl: 'page/other/faq.html',
            controller: 'faqController',
		})
        .when('/myprofile/order_true', {
            templateUrl: 'page/myprofile/order_true.html',
            controller: 'OrdertrueController',
		})
        .when('/myprofile/order_false', {
            templateUrl: 'page/myprofile/order_false.html',
            controller: 'OrderfalseController',
		})
         .when('/forget_pass', {
            templateUrl: 'page/login/forgot.html',
            controller: 'forgetController',
		})
         .when('/verify_code', {
            templateUrl: 'page/login/verify_code.html',
            controller: 'verifyController',
		})
        .when('/verification', {
            templateUrl: 'page/login/verification.html',
            controller: 'verificationController',
		})
        .when('/notification', {
            templateUrl: 'page/notification/index.html',
            controller: 'notificationController',
		})
        
});

/*
.run(function($rootScope, $window){
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        if((next.templateUrl === "pages/select/index.html") || 
           (next.templateUrl === "pages/login/index.html")){
            if(localStorage.getItem('user_id')){
                
                $window.location.assign("#/wall");
                $window.location.reload();
                // $window.path("/wall");
            }
        }else if((next.templateUrl === 'pages/register/register_one.html') || 
           (next.templateUrl === 'pages/register/register_two.html') ||
           (next.templateUrl === 'pages/register/register_three.html')){
           if(localStorage.getItem('user_id')){
                
                $window.location.assign("#/wall");
                $window.location.reload();
                // $window.path("/wall");
            }
        }else{
            if(!localStorage.getItem('user_id')){
                if((next.templateUrl === 'pages/forget_pass/index.html')){
                    $window.location.assign("#/forget_pass");
                }else{
                    $window.location.assign("#/select");
                    $window.location.reload();
                }
               
                // $window.path("/wall");
            }
        }
    });
});
*/