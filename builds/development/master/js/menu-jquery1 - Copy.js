var main = function() {
 
 /* Push the body and the nav over by 285px over */
  
$('.icon-menu').click(function(e) {
  e.stopPropagation();
  $('.menu').animate({
     
 marginLeft: "0px",
 height: "100%"
   
 }, 250);

    
// $('body').animate({
      
// left: "285px"
  
//   }, 200);


 
 });

  
/* Then push them back */
  
$('body').click(function() {
   
 $('.menu').animate({
    
  marginLeft: "-285px",
  height:"0px"
   
 }, 250);

    
$('body').animate({
    
  left: "0px"
  
  }, 200);
  
});

};



$(document).ready(main);