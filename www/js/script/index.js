
document.addEventListener('deviceready',onDeviceReady, false);
function onDeviceReady() {
document.addEventListener("backbutton",amintest, false);
function amintest(){
    var loc =   window.location.hash;
    alert (loc);
    return false;
    loc = loc.replace("#/", "");
    loc1 = loc.split('/');
    if(loc == "cart" || loc == "myprofile/" ||  loc == "myprofile" || loc == "about" || loc == "branches" || loc == "branch" || loc == "contact" || loc == "cooperation" || loc == "cooperation" || loc == "faq" || loc == "law" || loc == 'login' || loc == 'register' )
    {
      window.location.hash = "#/home"; 
    }
    else if(loc1[0] == 'menu' && localStorage.getItem('default_branch')){
      if(localStorage.getItem('default_branch') != 0)  
        window.location.hash = "#/home"; 
      else
         window.location.hash = "#/branch"; 
   }
    else if(loc1[0] == 'menu' && !localStorage.getItem('default_branch')){
        window.location.hash = "#/branch"; 
    }
    else if(loc1[0] == 'food'){
        window.location.hash = "#/menu/"+loc1[2]; 
    }
    
    else if(loc1[0] == 'comments'){
        window.location.hash = "#/food/"+loc1[1]+"/"+loc1[2]; 
    }
     else if(loc1[0] == 'comment'){
        window.location.hash = "#/food/"+loc1[1]+"/"+loc1[2]; 
    }
     else if(loc == 'myprofile/order_list' || loc == 'myprofile/setting' || loc == 'charge/' || loc == 'myprofile/support' || loc == 'myprofile/address' || loc == 'favorite'   ){
        window.location.hash = "#/myprofile/"; 
    }
     else if(loc1[0] == 'pictures' && localStorage.getItem('gallery_lg') != 1){
        window.location.hash = "#/food/"+loc1[1]+"/"+loc1[2]; 
    }
    else if(loc1[0] == 'pictures' && localStorage.getItem('gallery_lg') == 1){
         $('#lightgallery').data('lightGallery').destroy();     
    }
    
    else if(loc == 'myprofile/order_true'){
        window.location.hash = "#/home"; 
    }
    else if(loc1[0] == 'checkout'){
        window.location.hash = "#/cart"; 
    }
    else if(loc == 'myprofile/support_new'){
        window.location.hash = "#/myprofile/support"; 
    }
    else if(loc1[0] == 'myprofile' && loc1[0] == 'support_detail'){
        window.location.hash = "#/myprofile/support"; 
    }
    else if(loc1[0] == 'myprofile' && loc1[0] == 'order_detail'){
        window.location.hash = "#/myprofile/order_list"; 
    }
    else if(loc == 'myprofile/new_address'){
        window.location.hash = "#/myprofile/address"; 
    }
    else if(loc1[0] == 'edit_address' || loc1[0] == 'edit_address_map'){
        window.location.hash = "#/myprofile/address"; 
    }
     else if(loc == 'home'){
        navigator.app.exitApp();
    }
    else{
       window.history.back(); 
    }
}
}


