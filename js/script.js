var serviceDirection = new google.maps.DirectionsService();
var userLocation = new google.maps.LatLng(0,0);
var restaurants;
var prizes = new Array();
var overmap;
var markersArray = [];

var testLocFallbackOn = true
var mapthumb = {
	width:'200',
	height:'100',
	zoom:'15'
};
var mapDetailZoomLevel = 15;
var mapYOffset = 0;
var mapXOffset = 0;
var mapYzoomOffset = 160;
var mapXzoomOffset = 0;
var bounds = new google.maps.LatLngBounds();
var loadCt = 0;
var loadMax = 0;
var isMobi = false;
var isMobile = false;
var maxDistance = 30000;
var listingCt = 0;
var locationTimer;

$(document).ready(function(){
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
		isMobile = true;
	}
	
	if (Modernizr.localstorage) { 
		if( localStorage["firsttimer"] != "no" ){
			_gaq.push(['_trackEvent', 'Load', 'about', 'autopop']);
			$('#aboutbox').fadeIn();
			$('.scroll-pane').jScrollPane(
				{
					showArrows: false,
					verticalGutter: 15
				}
			);
		}
	}
	
	if( $('body').width() > 480 ){
		mapYOffset = 50;
	}
	
//	if( $('body').width() > 700 ){
//		mapYOffset = 0;
//		mapXOffset = -Math.floor($('body').width()/4);
// 	}
	
	$('#btncloseloc').click(function(){_gaq.push(['_trackEvent', 'Main Nav', 'location', 'close']); $('#locationbox').fadeOut();});
	$('#btncloseinfo').click(GetHome);
	$('#loc').click(function(){
		_gaq.push(['_trackEvent', 'Main Nav', 'location', 'open']);
		CloseAllBoxes();
		$('#locationbox').fadeIn();
		$('#loctext').focus();
		return false;
	});
	$('#btnclose').click(function(){
		_gaq.push(['_trackEvent', 'Main Nav', 'about', 'close']);
		if (Modernizr.localstorage) { 
			localStorage["firsttimer"] = "no";
		}
		$('#aboutbox').fadeOut();
	});
	$('#info').click(function(){
		_gaq.push(['_trackEvent', 'Main Nav', 'about', 'open']);
		CloseAllBoxes();
		$('#aboutbox').fadeIn();
		$('.scroll-pane').jScrollPane(
			{
				showArrows: false,
				verticalGutter: 15
			}
		);
	});
	$('#listshow').click(function(){
		ListShow();
	});
	
	$('#appmobi').click(function(){
		_gaq.push(['_trackEvent', 'Main Nav', 'app', 'open']);
		$('#appModal').modal('show');
	});
	
	locationTimer = window.setInterval(QueryLocation,10000);
	
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
	PlaceUserLocMarker();
	$('#listlist').empty();
	$.get('reactor/srvlist/getnames',function(response){
		DebugOut(response);
		restaurants = response;
		loadMax = restaurants.length*2;
		//GetDistance(0);
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
		DebugOut(response);
		
		restaurants = jQuery.parseJSON(response);
		loadMax = restaurants.length*2;
		for( idx in restaurants ){
			UpdateProgressBar();
			GetDistance(idx);
		}
	});
}


function GetDistance(pIdx){
	DebugOut("Getting Distance for: "+restaurants[pIdx].restaurantName+" ("+restaurants[pIdx].restaurantAlias+")");
	
	var searchRequest = {
		location: userLocation,
		radius: maxDistance,
		//types: ['food'],
		//rankBy: google.maps.places.RankBy.DISTANCE,
		//name: restname,
		name: '"'+restaurants[pIdx].restaurantName+'"'
		//ref: pIdx
	};
	//alert(JSON.stringify(searchRequest));
        	
	service = new google.maps.places.PlacesService(overmap);
	service.nearbySearch(searchRequest, function (results, status) {
		if (status == google.maps.places.PlacesServiceStatus.OK) {
			DebugOut(results);
			restaurants[pIdx].locations = results;
		}else{
			
		}
		UpdateProgressBar();
		DebugOut(restaurants);
		PlaceMarkers(pIdx);
		BuildListing(pIdx);
	});
}

function PlaceUserLocMarker(){
	
	var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000",
	        new google.maps.Size(21, 34),
	        new google.maps.Point(0,0),
	        new google.maps.Point(10, 34));
	
	var tmpMarker = new google.maps.Marker({
        map: overmap, 
        icon: pinImage,
        position: userLocation,
		title: "You Are Here",
		ref: -1
    });
    
//    google.maps.event.addListener(tmpMarker, 'click', function(jdx) {
//    	ListHide();
//    	overmap.setCenter(this.position);
//		overmap.panBy(mapXzoomOffset, -mapYzoomOffset);
//    	infoBubble.setContent("<h2>You Are Here.</h2>");
//    	infoBubble.open(overmap, this);
//    });
    
    markersArray.push(tmpMarker);
	
}

function PlaceMarkers(pIdx){
	for( jdx in restaurants[pIdx].locations ){
		
		restaurants[pIdx].locations[jdx].distance = CalcDistance(userLocation.lat(), userLocation.lng(),restaurants[pIdx].locations[jdx].geometry.location.lat(),restaurants[pIdx].locations[jdx].geometry.location.lng());
		restaurants[pIdx].locations[jdx].maplink = 'http://maps.google.com/?saddr='+userLocation.lat()+","+userLocation.lng()+'&daddr='+restaurants[pIdx].locations[jdx].vicinity;
		restaurants[pIdx].locations[jdx].address = restaurants[pIdx].locations[jdx].vicinity.replace(',','<br/>');
		
		// Add map marker
		//give the marker a color
	    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + restaurants[pIdx].restaurantColor,
	        new google.maps.Size(21, 34),
	        new google.maps.Point(0,0),
	        new google.maps.Point(10, 34));
		var tmpMarker = new google.maps.Marker({
	        map: overmap, 
	        icon: pinImage,
	        position: restaurants[pIdx].locations[jdx].geometry.location,
			title: restaurants[pIdx].restaurantName+" ("+(Math.round( restaurants[pIdx].locations[jdx].distance * 10 ) / 10)+" mi.)",
			ref: jdx
	    });
	    
	    markersArray.push(tmpMarker);
	    
	    google.maps.event.addListener(tmpMarker, 'click', function(jdx) {
	    	_gaq.push(['_trackEvent', 'Map', 'markerclick', this.title]);
        	//GetDetails(pIdx, jdx);
        	ListHide();
        	overmap.setCenter(this.position);
			overmap.panBy(mapXzoomOffset, -mapYzoomOffset);
        	infoBubble.setContent(GetDetailContent(pIdx, this.ref));
        	infoBubble.open(overmap, this);
        });
        if( jdx == 0 ){
        	restaurants[pIdx].marker = tmpMarker;
        	//bounds.extend(restaurants[pIdx].locations[jdx].geometry.location);
        }
		
		if( jdx > 5 ) break;
	}
	
}

function BuildListing(pIdx){
		DebugOut('building '+restaurants[pIdx].restaurantAlias);
		DebugOut(restaurants[pIdx].locations);
		listingCt++;
		if( restaurants[pIdx].locations != undefined ){
			var tmpListing = $('<li/>').attr('id',restaurants[pIdx].restaurantAlias).attr('listpos',pIdx).attr('distance',restaurants[pIdx].locations[0].distance).addClass('listing');
					
			var tmpName = "";
			for(jdx=0; jdx<restaurants[pIdx].prize.length; jdx++){
				if(jdx > 0) tmpName += " / ";
				tmpName += restaurants[pIdx].prize[jdx].prizeName;
			}
			
			tmpListing.append($('<a/>')
				.attr('href','#')
				.addClass('restaurant')
				.append($('<img/>').attr('src','img/marker_legend.png').addClass('marker').css('backgroundColor','#'+restaurants[pIdx].restaurantColor))
				.append(restaurants[pIdx].restaurantName+" - "+tmpName)
				.click(function(){
					_gaq.push(['_trackEvent', 'List', 'itemclick', restaurants[pIdx].restaurantAlias]);
					ListHide();
					//overmap.setZoom(mapDetailZoomLevel);
					overmap.setCenter(restaurants[pIdx].locations[0].geometry.location);
					overmap.panBy(mapXzoomOffset, -mapYzoomOffset);
        			infoBubble.setContent(GetDetailContent(pIdx, 0));
        			infoBubble.open(overmap, restaurants[pIdx].marker);
					return false;
					})
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
			
			
		}
		// Set the map bounds
		bounds.extend(userLocation);
		DebugOut('CHECKING FOR FINAL PREP - '+listingCt+" : "+restaurants.length);
		if( listingCt == restaurants.length ){
			DebugOut('DOING FINAL PREP');
			var finalitems = $('#listlist li').get();
			for( idx=0; idx<3; idx++ ){
				bounds.extend(restaurants[$(finalitems[idx]).attr('listpos')].locations[0].geometry.location);
			}
			$("#listlist li:eq(0)").before($("<li><h3>Closest</h3></li>")).after($("<li><h3>Nearby</h3></li>"));
			$('#listlist').prepend($('<li/>').append($('<div/>').attr('id','listhead').append($('<h2/>').html('Prizes')).append($('<a/>').attr('href','#').attr('onclick','return false;').click(ListHide).append($('<img/>').attr('src','img/listshow.png')))));
			overmap.fitBounds(bounds);
			overmap.panBy(mapXOffset, mapYOffset);
		}
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
				
			}
		}
	});
}

function clearOverlays() {
	listingCt = 0;
  bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markersArray.length; i++ ) {
    markersArray[i].setMap(null);
  }
}

function GetDetailContent(pIdx, pJdx){
		
		var tmpName = "";
		for(idx=0; idx<restaurants[pIdx].prize.length; idx++){
			if(idx > 0) tmpName += " / ";
			tmpName += restaurants[pIdx].prize[idx].prizeName;
		}
		
		$('#infobox .prize').html(tmpName);
		$('#infobox .restaurant').html(restaurants[pIdx].restaurantName);
		$('#infobox .distance').html((Math.round( restaurants[pIdx].locations[pJdx].distance * 10 ) / 10)+" mi.");
		$('#infobox .address').html(restaurants[pIdx].locations[pJdx].address);
		
		if( isMobi ){
			$('#infobox .extlink').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'websitemobi\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'AppMobi.device.launchExternal(\''+restaurants[pIdx].restaurantUrl+'\'); return false;');
			$('#infobox .directions').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'directionsmobi\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'AppMobi.device.launchExternal(\''+restaurants[pIdx].locations[pJdx].maplink+'\'); return false;');
		}else{
			$('#infobox .extlink').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'website\', \''+restaurants[pIdx].restaurantAlias+'\']);').attr('href',restaurants[pIdx].restaurantUrl).attr('target','_blank');
			$('#infobox .directions').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'directions\', \''+restaurants[pIdx].restaurantAlias+'\']);').addClass('btn').attr('href',restaurants[pIdx].locations[pJdx].maplink).attr('target','_blank');
		}
		
		if( isMobi ){
			$('#twshare').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'twsharemobi\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'twsharemobi(restaurants['+pIdx+'].restaurantName,restaurants['+pIdx+'].prize[0].prizeName); return false;');
			$('#fbshare').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'fbsharemobi\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'fbsharemobi(restaurants['+pIdx+'].restaurantName,restaurants['+pIdx+'].prize[0].prizeName); return false;');
			$('#gpshare').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'gpsharemobi\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'gpsharemobi(restaurants['+pIdx+'].restaurantName,restaurants['+pIdx+'].prize[0].prizeName); return false;');
		}else{
			$('#twshare').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'twshare\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'twshare(restaurants['+pIdx+'].restaurantName,restaurants['+pIdx+'].prize[0].prizeName); return false;');
			$('#fbshare').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'fbshare\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'fbshare(restaurants['+pIdx+'].restaurantName,restaurants['+pIdx+'].prize[0].prizeName); return false;');
			$('#gpshare').attr('onclick','_gaq.push([\'_trackEvent\', \'Detail\', \'gpshare\', \''+restaurants[pIdx].restaurantAlias+'\']); '+'gpshare(restaurants['+pIdx+'].restaurantName,restaurants['+pIdx+'].prize[0].prizeName); return false;');
		}

		return $('#infobox').html();
}

function GetHome(){
	overmap.fitBounds(bounds);
	overmap.panBy(mapXOffset, mapYOffset);
	//$('#infobox').fadeOut();  
	infoBubble.close();
	//ListShow();
	return false;
}

function HandleGeolocationErrors(error)  
{  
	$('#geoModal').fadeIn();
	window.clearInterval(locationTimer);
	
	_gaq.push(['_trackEvent', 'Load', 'location', 'fail']);
	
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
		_gaq.push(['_trackEvent', 'Load', 'location', 'setfallback']);
		// Set a fallback location 40.7406941, -73.9905943 
		// Location: 40.67857830000001, -73.5421847
		HandleGeolocationQuery({coords:{latitude:40.67857830000001,longitude:-73.5421847}});
	}
}  
  
function HandleGeolocationQuery(position){
	
	_gaq.push(['_trackEvent', 'Load', 'desktop', '']);
	
	// Check against existing location before setting
	if( CalcDistance(userLocation.lat(), userLocation.lng(),position.coords.latitude,position.coords.longitude) > 1){
		userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		DebugOut('user location set: '+position.coords.latitude+', '+position.coords.longitude);
		$('#location span').html(position.coords.latitude.toString().substring(0,8)+', '+position.coords.longitude.toString().substring(0,8));
		GetRest();
	}else{
		DebugOut('User Location Unchanged');
	}
}

function HandleGeolocationQueryMobi(position){
	
	_gaq.push(['_trackEvent', 'Load', 'app', '']);
	
	if( CalcDistance(userLocation.lat(), userLocation.lng(),position.coords.latitude,position.coords.longitude) > 1){
		userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
		DebugOut('user location set: '+position.coords.latitude+', '+position.coords.longitude);
		$('#location span').html(position.coords.latitude.toString().substring(0,8)+', '+position.coords.longitude.toString().substring(0,8));
		GetRest();
	}
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
    
    infoBubble = new InfoBubble({
		map: overmap,
		minWidth:300,
		minHeight:220,
		maxWidth:400,
		maxHeight:220,
		shadowStyle: 0,
		padding: 20,
		backgroundColor: '#f6f0e7',
		borderRadius: 0,
		arrowSize: 15,
		borderWidth: 2,
		borderColor: '#362814',
		disableAutoPan: true,
		hideCloseButton: true,
		arrowPosition: '50%',
		zindex: 2000,
		backgroundClassName: 'float-panel info_box',
		arrowStyle: 0
	});
}

function ListHide(){
	_gaq.push(['_trackEvent', 'List', 'hide', 'header']);
	$('#listlist').fadeOut();
	$('#listshow').fadeIn();
}

function ListShow(){
	_gaq.push(['_trackEvent', 'List', 'show', 'listshow']);
	GetHome();
	$('#listlist').fadeIn();
	$('#listshow').fadeOut();
	
}


function fbshare(pTitle,pToy){
	
	var fbcontent = "https://www.facebook.com/dialog/feed?app_id=314668331957423&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(social['title'])+"&caption="+escape(social['title'])+"&description="+escape('I found the '+pToy+' at '+pTitle+' thanks to ThePrizeInside')+"&redirect_uri=https://facebook.com/";
	openpopup(fbcontent,'facebook',1000,450);
}

function fbsharemobi(pTitle,pToy){
	
	var fbcontent = "https://www.facebook.com/dialog/feed?app_id=314668331957423&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(social['title'])+"&caption="+escape(social['title'])+"&description="+escape('I found the '+pToy+' at '+pTitle+' thanks to ThePrizeInside')+"&redirect_uri=https://facebook.com/";
	AppMobi.device.launchExternal(fbcontent);
}

function twshare(pTitle,pToy){
	DebugOut('twshare');
	var twurl = "http://twitter.com/home?status=";
	
	if( isMobile ){
		twurl = "https://mobile.twitter.com/compose/tweet?status=";
	}
	
	var twcontent = escape('I found the '+pToy+' at '+pTitle+' thanks to ThePrizeInside')+" "+escape(social['link']);
	openpopup(twurl+twcontent,'tweeters',550,450);
}

function twsharemobi(pTitle,pToy){
	//var twcontent = 'http://twitter.com/home?status='+tescape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside')+" "+escape(social['link']);
	var twcontent = 'https://mobile.twitter.com/compose/tweet?status='+escape('I found the '+pToy+' at '+pTitle+' thanks to ThePrizeInside http://theprizeinside.com');
	//alert('launching external: '+twcontent);
	AppMobi.device.launchExternal(twcontent);
}

function gpshare(pTitle, pToy){
	var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape('I found the '+pToy+' at '+pTitle+' thanks to ThePrizeInside');
	openpopup(url,'gplus',550,450);
}

function gpsharemobi(pTitle, pToy){
	var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape('I found the '+pToy+' at '+pTitle+' thanks to ThePrizeInside');
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


Number.prototype.toRad = function() {
   return this * Math.PI / 180;
}

function CalcDistance(lat2, lon2, lat1, lon1){
	
	var R = 6371; // km 
	//has a problem with the .toRad() method below.
	var x1 = lat2-lat1;
	var dLat = x1.toRad();  
	var x2 = lon2-lon1;
	var dLon = x2.toRad();  
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 
	
	return d;
}

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
			DebugOut(newline);
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
