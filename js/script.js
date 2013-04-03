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
var loadCt = 0;
var loadMax = 0;
var isMobi = false;

function QueryLocation(){
	navigator.geolocation.getCurrentPosition(HandleGeolocationQuery,HandleGeolocationErrors);
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
		radius: '50',
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
			CalcRoute(results[i].geometry.location.jb+","+results[i].geometry.location.kb, pIdx, results.length);
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
				restaurants[pIdx].location = new google.maps.LatLng(result.routes[0].legs[0].end_location.jb, result.routes[0].legs[0].end_location.kb);
				var imgurl = "http://maps.googleapis.com/maps/api/staticmap?center="+result.routes[0].legs[0].end_location.jb+","+result.routes[0].legs[0].end_location.kb+"&zoom="+mapthumb.zoom+"&size="+mapthumb.width+"x"+mapthumb.height+"&markers=color:0x"+restaurants[pIdx].restaurantColor+"%7Clabel:*%7C"+result.routes[0].legs[0].end_location.jb+","+result.routes[0].legs[0].end_location.kb+"&sensor=false";
				var maplink = 'http://maps.google.com/?saddr='+userLocation.lat()+","+userLocation.lng()+'&daddr='+result.routes[0].legs[0].end_address;
				
				var tmpListing = $('<li/>').attr('id',restaurants[pIdx].restaurantAlias).addClass('listing').css('backgroundColor','#'+restaurants[pIdx].restaurantColor).click(function(){/*GetDetails(pIdx);*/});
				
				var tmpName = "";
				for(idx=0; idx<restaurants[pIdx].prize.length; idx++){
					if(idx > 0) tmpName += " / ";
					tmpName += restaurants[pIdx].prize[idx].prizeName;
				}
				tmpListing.append($('<h2/>').addClass('prize').append(tmpName).append($('<i/>').addClass('icon-info-sign')).click(function(){GetDetails(pIdx);}));
				//.append($('<img/>').attr('src','http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+restaurants[pIdx].restaurantColor))
				tmpListing.append($('<div/>').addClass('restaurant').html(restaurants[pIdx].restaurantName).click(function(){GetDetails(pIdx);}));
				tmpListing.append($('<div/>').addClass('distance').html(result.routes[0].legs[0].distance.text).click(function(){GetDetails(pIdx);}));
				
				//tmpListing.append($('<a/>').addClass('detailsbtn').addClass('btn').attr('href','#').attr('target','_blank').append($('<i/>').addClass('icon-info-sign')).append('&nbsp;Details').click(function(){GetDetails(pIdx); return false;}));
				// Share dropdown
				var shareGroup = $('<div/>').addClass('btn-group').addClass('socialgroup');
				
				
				if( isMobi ){
					shareGroup.append($('<a/>').attr('href','#').addClass('btn').append($('<i/>').addClass('icon-twitter')).attr('onclick','twsharemobi(restaurants['+pIdx+'].restaurantName);'));
					shareGroup.append($('<a/>').attr('href','#').addClass('btn').append($('<i/>').addClass('icon-facebook')).attr('onclick','fbsharemobi(restaurants['+pIdx+'].restaurantName);'));
				}else{
					shareGroup.append($('<a/>').attr('href','#').addClass('btn').append($('<i/>').addClass('icon-twitter')).click(function(){twshare(restaurants[pIdx].restaurantName);}));
					shareGroup.append($('<a/>').attr('href','#').addClass('btn').append($('<i/>').addClass('icon-facebook')).click(function(){fbshare(restaurants[pIdx].restaurantName);}));
				}
				//shareDropdown.append($('<a/>').attr('href','#').addClass('btn').append($('<i/>').addClass('icon-google-plus')).click(function(){gpshare(restaurants[pIdx].restaurantName);}));
				
				var toolGroup = $('<div/>').addClass('btn-group').addClass('toolgroup');
				if( isMobi ){
					toolGroup.append($('<a/>').addClass('extlink').addClass('btn').attr('href','#').attr('onclick','AppMobi.device.launchExternal(restaurants['+pIdx+'].restaurantUrl); return false;').append($('<i/>').addClass('icon-globe')).append('&nbsp;Website'));
					toolGroup.append($('<a/>').addClass('directions').addClass('btn').attr('href','#').attr('onclick','AppMobi.device.launchExternal(\''+maplink+'\'); return false;').append($('<i/>').addClass('icon-road')).append('&nbsp;Directions'));
				}else{
					toolGroup.append($('<a/>').addClass('extlink').addClass('btn').attr('href',restaurants[pIdx].restaurantUrl).attr('target','_blank').append($('<i/>').addClass('icon-globe')).append('&nbsp;Website'));
					toolGroup.append($('<a/>').addClass('directions').addClass('btn').attr('href',maplink).attr('target','_blank').append($('<i/>').addClass('icon-road')).append('&nbsp;Directions'));
					//toolGroup.append($('<a/>').attr('href','#').addClass('btndetails').addClass('btn').append($('<i/>').addClass('icon-zoom-in')).click(function(){GetDetails(pIdx);}));
				}
				
				tmpListing.append(toolGroup);
				tmpListing.append(shareGroup);
				
				
				// Prize details here
				var tmpDetails = $('<div/>').addClass('details');
				tmpDetails.append($('<div/>').addClass('address').html(result.routes[0].legs[0].end_address.replace(',','<br/>')));
				
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
			    
			    google.maps.event.addListener(tmpMarker, 'click', function() {
		        	GetDetails(pIdx);
		        });
				bounds.extend(restaurants[pIdx].location);
				overmap.fitBounds(bounds);
				overmap.panBy(0, mapYOffset);
				
			}
		}
		UpdateProgressBar();
	});
}

function GetDetails(pIdx){
	//
	if( $('#listlist #'+restaurants[pIdx].restaurantAlias+' .details').css('display') == 'none' ){
		$('#listlist li .details').hide();
		$('#listlist #'+restaurants[pIdx].restaurantAlias).show().find('.details').show();
		//$('#listlist #'+restaurants[pIdx].restaurantAlias).show().find('.btndetails i').removeClass('icon-zoom-in').addClass('icon-zoom-out');
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
	//$('#listlist li .btndetails i').removeClass('icon-zoom-out').addClass('icon-zoom-in');
	$('#listlist li').show(); 
	return false;
}

function HandleGeolocationErrors(error)  
{  
	
	$('#geoModal').modal('show');
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
		HandleGeolocationQuery({coords:{latitude:40.7406941,longitude:-73.9905943}});
	}
}  
  
function HandleGeolocationQuery(position){
	userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	DebugOut('user location set: '+position.coords.latitude+', '+position.coords.longitude);
	GetRest();
}

function HandleGeolocationQueryMobi(position){
	userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
	//alert('user location set: '+position.coords.latitude+', '+position.coords.longitude);
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




function fbshare(pTitle){
	
	var fbcontent = "https://www.facebook.com/dialog/feed?app_id=314668331957423&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(social['title'])+"&caption="+escape(social['title'])+"&description="+escape('Check out whats in the '+pTitle+' kids meal at ThePrizeInside')+"&redirect_uri=https://facebook.com/";
	openpopup(fbcontent,'facebook',1000,450);
}

function fbsharemobi(pTitle){
	
	var fbcontent = "https://www.facebook.com/dialog/feed?app_id=314668331957423&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(social['title'])+"&caption="+escape(social['title'])+"&description="+escape('Check out whats in the '+pTitle+' kids meal at ThePrizeInside')+"&redirect_uri=https://facebook.com/";
	AppMobi.device.launchExternal(fbcontent);
}

function twshare(pTitle){
	var twcontent = escape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside')+" "+escape(social['link']);
	openpopup('http://twitter.com/home?status='+twcontent,'tweeters',550,450);
}

function twsharemobi(pTitle){
	//var twcontent = 'http://twitter.com/home?status='+tescape('Check out what\'s in the '+pTitle+' kids meal at ThePrizeInside')+" "+escape(social['link']);
	var twcontent = 'https://mobile.twitter.com/compose/tweet?status='+escape('Check out whats in the '+pTitle+' kids meal at The Prize Inside http://theprizeinside.com');
	//alert('launching external: '+twcontent);
	AppMobi.device.launchExternal(twcontent);
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
