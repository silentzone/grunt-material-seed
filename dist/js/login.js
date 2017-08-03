var test = "gggggggggggggggggg";



  // 入焦放大效果 
    $("#login_form input").on("blur",function () { 
             // 验证功能 
             // 背景特效
             var test2 = test;
             zoomOut();   
             return false;
     });
     $("#login_form input").on("focus",function () { 
             // 验证功能 
             // 背景特效
             zoomIn();   
             return false;
     });
     var zoomIn = function () { 
       
         $(".wrap").addClass("zoomIn"); 
     } 
     var zoomOut = function () {  
         $(".wrap").removeClass("zoomIn");    
     }