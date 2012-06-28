/* Author:

*/
$(document).ready(function(){
//	jQuery('div.camera_wrap_mcd').camera(); //the basic method
//	jQuery('div.camera_wrap_bk').camera(); //the basic method
//	jQuery('div.camera_wrap_bel').camera(); //the basic method
//	jQuery('div.camera_wrap_snc').camera(); //the basic method
	$('.flexslider').flexslider({
      animation: "slide",
      slideshow: false, 
      controlNav: true,
      start: function(slider) {
      },
      after: function(slider) {
      }
    });
});