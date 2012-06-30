/* Author: Matthew Wilber (mwilber@gmail.com)

*/
$(document).ready(function(){
	
	FB.init({appId: FBconfig.app.id, status : true, cookie: true, xfbml : true});
	SetFrame();
	
	$('.nav li a').each( function(key, item){
		//alert($(item).attr('href').substring(1));
		var tempId = $(item).attr('href').substring(1);
		if( tempId != "" ){
			$('#'+tempId).load('reactor/panel/index/'+tempId, function(){
				$('#'+tempId+' .flexslider').flexslider({
			      	animation: "slide",
			      	slideshow: false, 
			      	controlNav: true,
			      	directionNav: !Modernizr.touch,
			      	start: function(slider) {
			      	},
			      	after: function(slider) {
			      	}
			    });
			});
		}
	});
});