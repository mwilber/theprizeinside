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

function fbshare(){
	WallPost(social['link'] , social['title'] , social['description'] , social['image'] , '');
}

function twshare(){
	var twcontent = escape(social['title'])+" - "+escape(social['description'])+" "+escape(social['link']);
	openpopup('http://twitter.com/home?status='+twcontent,'tweeters',550,450);
}

function gpshare(){
	var url = "https://plus.google.com/share?url="+escape(social['link']);
	openpopup(url,'gplus',550,450);
}


/////////////////////////////////////////////////////////////////////////////
//	Utility Functions
/////////////////////////////////////////////////////////////////////////////

// If the browser has a console, write to it.
function DebugOut(newline){
	try{
		if (typeof console == "object"){ 
			console.log(newline);
		}
	}catch(err){
		
	}
	
}

// Open a popup centered on the screen.
function openpopup(url,name,width,height)
{
	// Set up the window attrubutes
	var attributes = "toolbar=0,location=0,height=" + height;
	attributes = attributes + ",width=" + width;
	var leftprop, topprop, screenX, screenY, cursorX, cursorY, padAmt;
	
	// Get the clients screen size
	if(navigator.appName == "Microsoft Internet Explorer") {
		screenY = screen.height;
		screenX = screen.width;
	}else{
		screenY = window.outerHeight;
		screenX = window.outerWidth;
	}
	
	// Set the x/y position relative to the center of the screen
	leftvar = (screenX - width) / 2;
	rightvar = (screenY - height) / 2;
	if(navigator.appName == "Microsoft Internet Explorer") {
		leftprop = leftvar;
		topprop = rightvar;
	}else {
		leftprop = (leftvar - pageXOffset);
		topprop = (rightvar - pageYOffset);
	}
	attributes = attributes + ",left=" + leftprop;
	attributes = attributes + ",top=" + topprop;

	// Open the window
	window.open(url,name,attributes)
}

