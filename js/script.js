var serviceDirection = new google.maps.DirectionsService();
var userLocation;
var restaurants;
var overmap;
var markersArray = [];

var testLocFallbackOn = true
var mapthumb = {
	width:'200',
	height:'100',
	zoom:'15'
};
var mapDetailZoomLevel = 15;
var mapYOffset = 130;
var mapXOffset = 0;
var mapYzoomOffset = 80;
var mapXzoomOffset = 0;
var bounds = new google.maps.LatLngBounds();
var loadCt = 0;
var loadMax = 0;
var isMobi = false;
var isMobile = false;
var maxDistance = 20;

$(document).ready(function(){
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		isMobile = true;
	}
	
	if( $('body').width() > 480 ){
		mapYOffset = 50;
	}
	
//	if( $('body').width() > 700 ){
//		mapYOffset = 0;
//		mapXOffset = -Math.floor($('body').width()/4);
// 	}
	
	$('#btncloseloc').click(function(){$('#locationbox').fadeOut();});
	$('#btncloseinfo').click(GetHome);
	$('#loc').click(function(){
		CloseAllBoxes();
		$('#locationbox').fadeIn();
		return false;
	});
	$('#btnclose').click(function(){$('#aboutbox').fadeOut();});
	$('#info').click(function(){
		CloseAllBoxes();
		$('#aboutbox').fadeIn();
		$('.scroll-pane').jScrollPane(
			{
				showArrows: false,
				verticalGutter: 15
			}
		);
	});
	
	$('#appmobi').click(function(){
		$('#appModal').modal('show');
	});
	
});

function QueryLocation(){
	window.navigator.geolocation.getCurrentPosition(HandleGeolocationQuery,HandleGeolocationErrors,{
	  enableHighAccuracy: true,
	  timeout: 5000,
	  maximumAge: 0
	});
}

function UpdateProgressBar(){
	loadCt++;
	var percent = (loadCt/loadMax)*100;
	DebugOut('loading: '+percent+'% ('+loadMax+'/'+loadCt+')');
	if( percent > 99 ){
		$('#loader').hide();
	}else{
		if(percent > 66){
			$('#loader .message').html('Measuring distances');
		}else if(percent > 33){
			$('#loader .message').html('Finding restaurants');
		}else{
			$('#loader .message').html('Getting prizes');
		}
		
		$('.progress .bar').css('width',percent+'%');
	}
	
}


function GetRest(){
	clearOverlays();
	$('#listlist').empty();
	$.get('reactor/srvlist/getnames',function(response){
		console.log(response);
		restaurants = response;
		loadMax = restaurants.length*3;
		for( idx in restaurants ){
			UpdateProgressBar();
			GetDistance(idx);
		}
	});
}

function GetRestMobi(){
	clearOverlays();
	$('#listlist').empty();
	$.get('http://theprizeinside.com/reactor/srvlist/getnames',function(response){
		console.log(response);
		
		restaurants = jQuery.parseJSON(response);
		loadMax = 1*3;
		for( idx in restaurants ){
			UpdateProgressBar();
			GetDistance(idx);
		}
	});
}


function GetDistance(pIdx){
	DebugOut("Getting Distance for: "+restaurants[pIdx].restaurantName+" ("+restaurants[pIdx].restaurantAlias+")");
	
	var restname = restaurants[pIdx].restaurantName;
	
	var searchRequest = {
		location: userLocation,
		radius: maxDistance,
		types: ['food'],
		rankBy: google.maps.places.RankBy.DISTANCE,
		query: restname,
		ref: pIdx
	};
	//alert(JSON.stringify(searchRequest));
        	
	service = new google.maps.places.PlacesService(overmap);
	service.textSearch(searchRequest, function (results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			console.log(results);
			var i=0;
			// Going with the first result because that's the closest
			CalcRoute(results[i].geometry.location.lat()+","+results[i].geometry.location.lng(), pIdx, results.length);
		}else{
			
		}
		UpdateProgressBar();
	});
}

function CalcRoute(pEnd, pIdx, pCt) {
	var request = {
		origin:userLocation.lat()+","+userLocation.lng(),
		destination:pEnd,
		travelMode: google.maps.TravelMode.DRIVING
	};
	//DebugOut('Getting Directions...');
	//DebugOut(request);
	serviceDirection.route(request, function(result, status) {
		DebugOut(result);
		if (status == google.maps.DirectionsStatus.OK) {
			if( restaurants[pIdx].prize[0].prizeName ){
				restaurants[pIdx].location = new google.maps.LatLng(result.routes[0].legs[0].end_location.lat(), result.routes[0].legs[0].end_location.lng());
				restaurants[pIdx].distance = result.routes[0].legs[0].distance.text;
				restaurants[pIdx].address = result.routes[0].legs[0].end_address.replace(',','<br/>');
				
				restaurants[pIdx].imgurl = "http://maps.googleapis.com/maps/api/staticmap?center="+result.routes[0].legs[0].end_location.lat()+","+result.routes[0].legs[0].end_location.lng()+"&zoom="+mapthumb.zoom+"&size="+mapthumb.width+"x"+mapthumb.height+"&markers=color:0x"+restaurants[pIdx].restaurantColor+"%7Clabel:*%7C"+result.routes[0].legs[0].end_location.lat()+","+result.routes[0].legs[0].end_location.lng()+"&sensor=false";
				restaurants[pIdx].maplink = 'http://maps.google.com/?saddr='+userLocation.lat()+","+userLocation.lng()+'&daddr='+result.routes[0].legs[0].end_address;
				
				var tmpListing = $('<li/>').attr('id',restaurants[pIdx].restaurantAlias).attr('distance',restaurants[pIdx].distance).addClass('listing');
				
				var tmpName = "";
				for(idx=0; idx<restaurants[pIdx].prize.length; idx++){
					if(idx > 0) tmpName += " / ";
					tmpName += restaurants[pIdx].prize[idx].prizeName;
				}
				
				tmpListing.append($('<a/>')
					.attr('href','#')
					.addClass('restaurant')
					.append($('<img/>').attr('src','img/marker_legend.png').addClass('marker').css('backgroundColor','#'+restaurants[pIdx].restaurantColor))
					.append(restaurants[pIdx].restaurantName+" - "+tmpName)
					.click(function(){GetDetails(pIdx); return false;})
				);
				
				$('#listlist').append(tmpListing);
				
				var items = $('#listlist li').get();
				items.sort(function(a,b){
				  var keyA = parseFloat($(a).attr('distance'));
				  var keyB = parseFloat($(b).attr('distance'));
				
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
			    
			    markersArray.push(tmpMarker);
			    
			    google.maps.event.addListener(tmpMarker, 'click', function() {
		        	GetDetails(pIdx);
		        });
				bounds.extend(restaurants[pIdx].location);
				overmap.fitBounds(bounds);
				overmap.panBy(mapXOffset, mapYOffset);
				
			}
		}
		UpdateProgressBar();
	});
}

function clearOverlays() {
  bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
}

function GetDetails(pIdx){

		$('#listlist').hide();
		
		var tmpName = "";
		for(idx=0; idx<restaurants[pIdx].prize.length; idx++){
			if(idx > 0) tmpName += " / ";
			tmpName += restaurants[pIdx].prize[idx].prizeName;
		}
		
		$('#infobox .prize').html(tmpName);
		$('#infobox .restaurant').html(restaurants[pIdx].restaurantName);
		$('#infobox .distance').html(restaurants[pIdx].distance);
		$('#infobox .address').html(restaurants[pIdx].address);
		
		if( isMobi ){
			$('#infobox .extlink').attr('onclick','AppMobi.device.launchExternal(\''+restaurants[pIdx].restaurantUrl+'\'); return false;');
			$('#infobox .directions').attr('onclick','AppMobi.device.launchExternal(\''+restaurants[pIdx].maplink+'\'); return false;');
		}else{
			$('#infobox .extlink').attr('href',restaurants[pIdx].restaurantUrl).attr('target','_blank');
			$('#infobox .directions').addClass('btn').attr('href',restaurants[pIdx].maplink).attr('target','_blank');
		}
		
		if( isMobi ){
			$('#twshare').attr('onclick','twsharemobi(restaurants['+pIdx+'].restaurantName,restaurants[pIdx].prize['+pIdx+'].prizeName);');
			$('#fbshare').attr('onclick','fbsharemobi(restaurants['+pIdx+'].restaurantName,restaurants[pIdx].prize['+pIdx+'].prizeName);');
			$('#gpshare').attr('onclick','gpsharemobi(restaurants['+pIdx+'].restaurantName,restaurants[pIdx].prize['+pIdx+'].prizeName);');
		}else{
			$('#twshare').click(function(){twshare(restaurants[pIdx].restaurantName,restaurants[pIdx].prize[0].prizeName);});
			$('#fbshare').click(function(){fbshare(restaurants[pIdx].restaurantName,restaurants[pIdx].prize[0].prizeName);});
			$('#gpshare').click(function(){gpshare(restaurants[pIdx].restaurantName,restaurants[pIdx].prize[0].prizeName);});
		}
		
		$('#infobox').fadeIn(); 
		overmap.setZoom(mapDetailZoomLevel);
		overmap.setCenter(restaurants[pIdx].location);
		overmap.panBy(mapXzoomOffset, -($('#infobox').height()-mapYzoomOffset));
}

function GetHome(){
	overmap.fitBounds(bounds);
	overmap.panBy(mapXOffset, mapYOffset);
	$('#infobox').fadeOut();  
	$('#listlist').fadeIn(); 
	return false;
}

function HandleGeolocationErrors(error)  
{  
	$('#geoModal').fadeIn();
 /*   switch(error.code)  
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
	}*/
	
	if( testLocFallbackOn ){
		// Set a fallback location 40.7406941, -73.9905943 
		// Location: 40.67857830000001, -73.5421847
		HandleGeolocationQuery({coords:{latitude:40.67857830000001,longitude:-73.5421847}});
	}
}  
  
function HandleGeolocationQuery(position){
	userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	DebugOut('user location set: '+position.coords.latitude+', '+position.coords.longitude);
	$('#location span').html(position.coords.latitude.toString().substring(0,8)+', '+position.coords.longitude.toString().substring(0,8));
	GetRest();
}

function HandleGeolocationQueryMobi(position){
	userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	//alert('user location set: '+position.coords.latitude+', '+position.coords.longitude);
	$('#location span').html(position.coords.latitude.toString().substring(0,8)+', '+position.coords.longitude.toString().substring(0,8));
	GetRestMobi();
}


function InitMap(){
    var latlng = new google.maps.LatLng(40.6687125,-73.5270709);
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      streetViewControl: false,
      disableDefaultUI: true
    }  
    
    overmap = new google.maps.Map(document.getElementById("overmap"), myOptions);
}




function fbshare(pTitle,pToy){
	
	var fbcontent = "https://www.facebook.com/dialog/feed?app_id=314668331957423&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(social['title'])+"&caption="+escape(social['title'])+"&description="+escape('I got the '+pToy+' at '+pTitle+' thanks to ThePrizeInside')+"&redirect_uri=https://facebook.com/";
	openpopup(fbcontent,'facebook',1000,450);
}

function fbsharemobi(pTitle,pToy){
	
	var fbcontent = "https://www.facebook.com/dialog/feed?app_id=314668331957423&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(social['title'])+"&caption="+escape(social['title'])+"&description="+escape('I got the '+pToy+' at '+pTitle+' thanks to ThePrizeInside')+"&redirect_uri=https://facebook.com/";
	AppMobi.device.launchExternal(fbcontent);
}

function twshare(pTitle,pToy){
	var twurl = "http://twitter.com/home?status=";
	
	if( isMobile ){
		twurl = "https://mobile.twitter.com/compose/tweet?status=";
	}
	
	var twcontent = escape('I got the '+pToy+' at '+pTitle+' thanks to ThePrizeInside')+" "+escape(social['link']);
	openpopup(twurl+twcontent,'tweeters',550,450);
}

function twsharemobi(pTitle,pToy){
	//var twcontent = 'http://twitter.com/home?status='+tescape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside')+" "+escape(social['link']);
	var twcontent = 'https://mobile.twitter.com/compose/tweet?status='+escape('I got the '+pToy+' at '+pTitle+' thanks to ThePrizeInside http://theprizeinside.com');
	//alert('launching external: '+twcontent);
	AppMobi.device.launchExternal(twcontent);
}

function gpshare(pTitle, pToy){
	var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape('I got the '+pToy+' at '+pTitle+' thanks to ThePrizeInside');
	openpopup(url,'gplus',550,450);
}

function gpsharemobi(pTitle, pToy){
	var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape('I got the '+pToy+' at '+pTitle+' thanks to ThePrizeInside');
	AppMobi.device.launchExternal(url);
}


function CloseAllBoxes(){
	$('#geoModal').fadeOut();
	$('#locationbox').fadeOut();
	$('#aboutbox').fadeOut();
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
