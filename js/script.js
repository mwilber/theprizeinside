/* Author: Matthew Wilber (mwilber@gmail.com)

*/

var searchRequest = {
	location: '',
	radius: '50',
	types: ['food'],
	rankBy: google.maps.places.RankBy.DISTANCE,
	query: '',
	ref: ''
};

var userLoc;
var servicePlace;
var serviceDirection = new google.maps.DirectionsService();
var queryLocIdx = 0;
var queryPanelIdx = 1;

$(document).ready(function(){
	
	navigator.geolocation.getCurrentPosition(HandleGeolocationQuery,HandleGeolocationErrors);
	
	FB.init({appId: FBconfig.app.id, status : true, cookie: true, xfbml : true});
	SetFrame();
	
	$('.nav li a').each( function(key, item){
		var tempId = $(item).attr('href').substring(1);
		if( tempId != "" ){
			$('#'+tempId).load('reactor/panel/index/'+tempId, function(){
				//console.log("calling GetDistance for: "+$('#'+tempId+' h2').html()+" ("+tempId+")");
				//GetDistance($('#'+tempId+' h2').html(), tempId);
				
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
			    if(queryPanelIdx < $('.nav li a').length-1){
			    	queryPanelIdx ++;
			    }else{
			    	StartGetDistance();
			    }
			});
		}
	});
});

function StartGetDistance(){
	//alert($('.nav li a').children()[queryLocIdx].attr('href').substring(1));
	if(queryPanelIdx >= $('.nav li a').length-1){
		if(queryLocIdx < $('.nav li a').length){
	    	queryLocIdx ++;
	    	if( $($('.nav li a')[queryLocIdx]).attr('href') ){
	    		GetDistance($($('.nav li a')[queryLocIdx]).html(), $($('.nav li a')[queryLocIdx]).attr('href').substring(1));
	    	}
	    }
	}
}

function fbshare(pTitle){
	WallPost(social['link'] , social['title'] , 'Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside.com' , social['image'] , '');
}

function twshare(pTitle){
	var twcontent = escape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside')+" "+escape(social['link']);
	openpopup('http://twitter.com/home?status='+twcontent,'tweeters',550,450);
}

function gpshare(pTitle){
	var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside.com');
	openpopup(url,'gplus',550,450);
}

function HandleGeolocationErrors(error)  
{  
    switch(error.code)  
    {  
        case error.PERMISSION_DENIED: 
        	alert("user did not share geolocation data");  
           	break;  
  
		case error.POSITION_UNAVAILABLE: 
			alert("could not detect current position");  
			break;  
  
		case error.TIMEOUT: 
 			alert("retrieving position timed out");  
			break;  
  
		default: 
			alert("unknown error");  
			break;  
	}  
}  
  
function HandleGeolocationQuery(position){
	searchRequest.location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
}

function GetDistance(pName, pRef){
	console.log("Getting Distance for: "+pName+" ("+pRef+")");
	searchRequest.query = pName;
	searchRequest.ref = pRef;
        	
	service = new google.maps.places.PlacesService(map);
	service.textSearch(searchRequest, function (results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			//console.log(results);
			var i=0;
			// Going with the first result because that's the closest
			//for (var i = 0; i < results.length; i++) {
				CalcRoute(results[i].geometry.location.Ya+","+results[i].geometry.location.Za, pName, pRef, results.length);
			//}
		}else{
			StartGetDistance();
		}
	});
}

function CalcRoute(pEnd, pName, pRef, pCt) {
	var request = {
		origin:searchRequest.location.lat()+","+searchRequest.location.lng(),
		destination:pEnd,
		travelMode: google.maps.TravelMode.DRIVING
	};
	serviceDirection.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			//console.log(result);
			//$('#'+pRef+' .locations').html('<a href="http://maps.google.com/?q='+pName+'" target="_blank"">'+pCt+' nearby.</a> <a href="http://maps.google.com/?saddr=&daddr='+result.routes[0].legs[0].end_address+'" target="_blank"">Closest: '+result.routes[0].legs[0].distance.text+'</a>');
			$('#'+pRef+' .locations').html('<a href="http://maps.google.com/?saddr='+searchRequest.location.lat()+","+searchRequest.location.lng()+'&daddr='+result.routes[0].legs[0].end_address+'" target="_blank""><i class="icon-road"></i>&nbsp;'+result.routes[0].legs[0].distance.text+'</a>');
		}
		StartGetDistance();
	});
}


/////////////////////////////////////////////////////////////////////////////
//	Utility Functions
/////////////////////////////////////////////////////////////////////////////

function pausecomp(millis) 
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); } 
while(curDate-date < millis);
} 

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

