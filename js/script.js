var serviceDirection = new google.maps.DirectionsService();
var userLocation;
var restaurants;
var overmap;

var testLocFallbackOn = true
var mapthumb = {
	width:'200',
	height:'100',
	zoom:'15'
};
var mapDetailZoomLevel = 15;
var mapYOffset = -30;
var bounds = new google.maps.LatLngBounds();

$(document).ready(function(){
	
	//if( !isMobile ){
		FB.init({appId: FBconfig.app.id, status : true, cookie: true, xfbml : true});
		SetFrame();
	//}
	
	InitMap();
	navigator.geolocation.getCurrentPosition(HandleGeolocationQuery,HandleGeolocationErrors);
	
});


function GetRest(){
	$.get('reactor/srvlist/getnames',function(response){
		console.log(response);
		restaurants = response;
		for( idx in restaurants ){
			GetDistance(idx);
		}
	});
}


function GetDistance(pIdx){
	console.log("Getting Distance for: "+restaurants[pIdx].restaurantName+" ("+restaurants[pIdx].restaurantAlias+")");
	
	var searchRequest = {
		location: userLocation,
		radius: '50',
		types: ['food'],
		rankBy: google.maps.places.RankBy.DISTANCE,
		query: restaurants[idx].restaurantName,
		ref: pIdx
	};
        	
	service = new google.maps.places.PlacesService(map);
	service.textSearch(searchRequest, function (results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			console.log(results);
			var i=0;
			// Going with the first result because that's the closest
			CalcRoute(results[i].geometry.location.kb+","+results[i].geometry.location.lb, pIdx, results.length);
		}else{
			
		}
	});
}

function CalcRoute(pEnd, pIdx, pCt) {
	var request = {
		origin:userLocation.lat()+","+userLocation.lng(),
		destination:pEnd,
		travelMode: google.maps.TravelMode.DRIVING
	};
	serviceDirection.route(request, function(result, status) {
		console.log(result);
		if (status == google.maps.DirectionsStatus.OK) {
			if( restaurants[pIdx].prize[0].prizeName ){
				restaurants[pIdx].location = new google.maps.LatLng(result.routes[0].legs[0].end_location.kb, result.routes[0].legs[0].end_location.lb);
				var imgurl = "http://maps.googleapis.com/maps/api/staticmap?center="+result.routes[0].legs[0].end_location.kb+","+result.routes[0].legs[0].end_location.lb+"&zoom="+mapthumb.zoom+"&size="+mapthumb.width+"x"+mapthumb.height+"&markers=color:0x"+restaurants[pIdx].restaurantColor+"%7Clabel:*%7C"+result.routes[0].legs[0].end_location.kb+","+result.routes[0].legs[0].end_location.lb+"&sensor=false";
				var maplink = 'http://maps.google.com/?saddr='+userLocation.lat()+","+userLocation.lng()+'&daddr='+result.routes[0].legs[0].end_address;
				
				var tmpListing = $('<li/>').attr('id',restaurants[pIdx].restaurantAlias).css('backgroundColor','#'+restaurants[pIdx].restaurantColor).click(function(){GetDetails(pIdx);});
				
				var tmpName = "";
				for(idx=0; idx<restaurants[pIdx].prize.length; idx++){
					if(idx > 0) tmpName += " / ";
					tmpName += restaurants[pIdx].prize[idx].prizeName;
				}
				tmpListing.append($('<h2/>').addClass('prize').append(tmpName));
				//.append($('<img/>').attr('src','http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+restaurants[pIdx].restaurantColor))
				tmpListing.append($('<div/>').addClass('restaurant').html(restaurants[pIdx].restaurantName));
				tmpListing.append($('<div/>').addClass('distance').html(result.routes[0].legs[0].distance.text));
				
				tmpListing.append($('<a/>').addClass('directions').addClass('btn').attr('href',maplink).attr('target','_blank').append($('<i/>').addClass('icon-road')).append('&nbsp;Get Directions'));
				//tmpListing.append($('<a/>').addClass('detailsbtn').addClass('btn').attr('href','#').attr('target','_blank').append($('<i/>').addClass('icon-info-sign')).append('&nbsp;Details').click(function(){GetDetails(pIdx); return false;}));
				
				
				// Prize details here
				var tmpDetails = $('<div/>').addClass('details');
				tmpDetails.append($('<a/>').addClass('extlink').addClass('btn').attr('href',restaurants[pIdx].restaurantUrl).attr('target','_blank').append($('<i/>').addClass('icon-globe')).append('&nbsp;More Info'));
				tmpDetails.append($('<div/>').addClass('address').html(result.routes[0].legs[0].end_address.replace(',','<br/>')));
				//tmpDetails.append('<a href="#" onclick="GetHome(); return false;" class="btn showall"><i class="icon-remove"></i></a>');
				// mini map
				//tmpDetails.append($('<img/>').attr('src',imgurl).addClass('map'));
				
				tmpListing.append(tmpDetails);
				
				$('#listlist').append(tmpListing);
				
				var items = $('#listlist li').get();
				items.sort(function(a,b){
				  var keyA = parseFloat($(a).find('.distance').text());
				  var keyB = parseFloat($(b).find('.distance').text());
				
				  if (keyA < keyB) return -1;
				  if (keyA > keyB) return 1;
				  return 0;
				});
				var ul = $('#listlist');
				$.each(items, function(i, li){
				  ul.append(li);
				});
				
				// Add map marker
				
				//give the marker a color
			    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + restaurants[pIdx].restaurantColor,
			        new google.maps.Size(21, 34),
			        new google.maps.Point(0,0),
			        new google.maps.Point(10, 34));
				var tmpMarker = new google.maps.Marker({
			        map: overmap, 
			        icon: pinImage,
			        position: restaurants[pIdx].location,
					title: restaurants[pIdx].restaurantAlias
			    });
//			    google.maps.event.addListener(tmpMarker, 'click', function() {
//		          overmap.setZoom(mapDetailZoomLevel);
//		          overmap.setCenter(tmpMarker.getPosition());
//		          $('#listlist li').hide();
//		          $('#listlist #'+tmpMarker.title).show();
//		        });
				bounds.extend(restaurants[pIdx].location);
				overmap.fitBounds(bounds);
				overmap.panBy(0, mapYOffset);
			}
		}
	});
}

function GetDetails(pIdx){
	if( $('#listlist #'+restaurants[pIdx].restaurantAlias+' .details').css('display') == 'none' ){
		$('#listlist li .details').hide();
		$('#listlist #'+restaurants[pIdx].restaurantAlias).show().find('.details').show();
		var container = $('#listlist');
		var scrollTo = $('#listlist #'+restaurants[pIdx].restaurantAlias);
		container.animate({
			scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop() - 20
		});
		//$('#btn_showall').show();
		overmap.setZoom(mapDetailZoomLevel);
		overmap.setCenter(restaurants[pIdx].location);
		overmap.panBy(0, mapYOffset);
	}else{
		GetHome();
	}
}

function GetHome(){
	overmap.fitBounds(bounds);
	overmap.panBy(0, mapYOffset); 
	$('#listlist li .details').hide(); 
	$('#listlist li').show(); 
	return false;
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
	
	if( testLocFallbackOn ){
		// Set a fallback location 40.7406941, -73.9905943 
		HandleGeolocationQuery({coords:{latitude:40.7406941,longitude:-73.9905943}});
	}
}  
  
function HandleGeolocationQuery(position){
	userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	DebugOut('user location set: '+position.coords.latitude+', '+position.coords.longitude);
	GetRest();
}



function InitMap(){
    var latlng = new google.maps.LatLng(40.6687125,-73.5270709);
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      streetViewControl: false,
      disableDefaultUI: true
    }  
    
    overmap = new google.maps.Map(document.getElementById("overmap"), myOptions);
}




function fbshare(pTitle){
	if( isMobile ){
		var url = "http://www.facebook.com/sharer.php?u="+escape(social['link']);
		openpopup(url,'gplus',550,450);
	}else{
		WallPost(social['link'] , social['title'] , 'Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside.com' , social['image'] , '');
	}
}

function twshare(pTitle){
	var twcontent = escape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside')+" "+escape(social['link']);
	openpopup('http://twitter.com/home?status='+twcontent,'tweeters',550,450);
}

function gpshare(pTitle){
	var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside.com');
	openpopup(url,'gplus',550,450);
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
