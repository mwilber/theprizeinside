/////////////////////////////////////////////////////////////////////////////
//  Utility Functions
/////////////////////////////////////////////////////////////////////////////

function GASuccess(){
	DebugOut("GA Success!");
}

function GAFail(){
	DebugOut("GA Fail!");
}

Number.prototype.toRad = function() {
   return this * Math.PI / 180;
};

function roundNumber(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
}

function CalcDistance(lat2, lon2, lat1, lon1){
	
	var R = 6371; // km 
	//var x1 = lat2-lat1;
	var x1 = roundNumber(lat2,7)-roundNumber(lat1,7);
	var dLat = x1.toRad();  
	var x2 = roundNumber(lon2,7)-roundNumber(lon1,7);
	var dLon = x2.toRad(); 
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + 
	                Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
	                Math.sin(dLon/2) * Math.sin(dLon/2);  
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 
	
	return d;
}

function DoToggle(self){
	return function(elem){
		DebugOut(elem);
		
		if( $(elem.target).attr('id') == "checkinAnonymous" ){
			if( $(elem.target).hasClass('fa-square-o') ){
				$(elem.target).removeClass('fa-square-o');
				$(elem.target).addClass('fa-check-square-o');
				//$('#msgAnonymous').html(lang.en.checkinAnonymous);
			}else{
				$(elem.target).addClass('fa-square-o');
				$(elem.target).removeClass('fa-check-square-o');
				//$('#msgAnonymous').html(lang.en.checkinPublic);
			}
		}else{
			$(elem.target).toggleClass('selected');
		}
	};
	
};

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

function QueryLocation(){
    window.navigator.geolocation.getCurrentPosition(HandleGeolocationQuery,HandleGeolocationErrors,{
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
}

function HandleGeolocationQuery(position){
    
    //_gaq.push(['_trackEvent', 'Load', 'desktop', '']);
    
    // Check against existing location before setting
    DebugOut("Distance: "+CalcDistance(userLocation.lat(), userLocation.lng(),position.coords.latitude,position.coords.longitude));
    if( CalcDistance(userLocation.lat(), userLocation.lng(),position.coords.latitude,position.coords.longitude) > DISTANCE_CHANGE_REFRESH_THRESHOLD){
        userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        DebugOut('user location set: '+position.coords.latitude+', '+position.coords.longitude);
        panel['userlocation'].Update();
        
        if(wallmap) wallmap.setCenter(userLocation);
        
        //GetLocationData();
        GetFSData();
        //$('#location span').html(position.coords.latitude.toString().substring(0,8)+', '+position.coords.longitude.toString().substring(0,8));
    }else{
        DebugOut('User Location Unchanged');
    }
    
    //See how close we are to all the venues
    for( idx in fsdata ){
    	for(jdx in fsdata[idx].response.venues){
    		var tmpvenue = fsdata[idx].response.venues[jdx];
    		if( CalcDistance(position.coords.latitude,position.coords.longitude,tmpvenue.location.lat,tmpvenue.location.lng) < CHECKIN_NOTIFICATION_THRESHOLD ){
    			if( tmpvenue.location.lat != autoCkLocation.lat() && tmpvenue.location.lng != autoCkLocation.lng() ){
    				DebugOut("Distance ("+tmpvenue.name+"): "+CalcDistance(position.coords.latitude,position.coords.longitude,tmpvenue.location.lat,tmpvenue.location.lng));
					// Set the sentinal location 
					autoCkLocation = new google.maps.LatLng(tmpvenue.location.lat,tmpvenue.location.lng);
					// Get the prize for the current location
					DebugOut('Checking for: '+idx);
					for( kdx in prizedata ){
						if( prizedata[kdx].restaurant.restaurantAlias == idx ){
							// Pop the checkin 
							panel['prize'].Load(prizedata[kdx]);
							panel['checkin'].Load(null,tmpvenue);
						}
					}
					
				}
    		}
    	}
    }
    
    // Show the use gps button
    $('#btngpssearch').show();
    $('.gpserror').hide();
}

function HandleGeolocationErrors(error)  
{  
    //$('#geoModal').fadeIn();
    
    //_gaq.push(['_trackEvent', 'Load', 'location', 'fail']);
    
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
    
    var lautopop = false;
    
    if( userLocation.lat() == 0 && userLocation.lng() == 0){
    	lautopop = true;
    }
    
    //if( testLocFallbackOn ){
        DebugOut('location error');
        //_gaq.push(['_trackEvent', 'Load', 'location', 'setfallback']);
        // Set a fallback location 40.7406941, -73.9905943 
        // Location: 40.67857830000001, -73.5421847
        
        HandleGeolocationQuery({coords:{latitude:40.67857830000001,longitude:-73.5421847}});  // NY
        //HandleGeolocationQuery({coords:{latitude:38.01918787467324,longitude:-77.51427148246567}}); // VA
    //}
    
    // Hide the use gps button
    //$('#btngpssearch').hide();
    $('.gpserror').show();
    
    
    if( lautopop ){
    	// auto-pop the location search box
    	panel['userlocation'].Load();
    }
    
    // Kill the querylocation loop
    window.clearInterval(locationTimer);
} 

// function fbshare(pTitle, pDescription){
//     
    // var fbcontent = "https://www.facebook.com/dialog/feed?app_id=567792933313140&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(pTitle)+"&caption="+escape(pTitle)+"&description="+escape(pDescription)+"&redirect_uri=https://facebook.com/";
    // //openpopup(fbcontent,'facebook',1000,450);
    // //navigator.app.loadUrl(url, { openExternal:true });
    // window.open(fbcontent, '_system');
    // //_gaq.push(['_trackEvent', 'Share', 'facebook', '']);
    // return false;
// }
// 
// function twshare(pTitle){
	// //alert('error 201');
    // //DebugOut('twshare');
    // var twurl = "https://mobile.twitter.com/compose/tweet?status="+escape(pTitle)+escape(": ")+escape(social['link']);
    // //openpopup(twurl,'tweeters',550,450);
    // //(url, { openExternal:true });
    // //alert('error 201: '+twurl);
    // window.open(twurl, '_system');
    // //_gaq.push(['_trackEvent', 'Share', 'twitter', '']);
    // return false;
// }
// 
// function gpshare(){
    // var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape(social['description'])+" "+escape(social['link']);
    // openpopup(url,'gplus',550,450);
    // //_gaq.push(['_trackEvent', 'Share', 'googleplus', '']);
    // return false;
// }

$.fn.doesExist = function(){
    return jQuery(this).length > 0;
};

$.getRelativeTime = function(diff) {
  var v = Math.floor(diff / 86400); diff -= v * 86400;
  if (v > 0) return (v == 1 ? 'Yesterday' : v + ' days ago');
  v = Math.floor(diff / 3600); diff -= v * 3600;
  if (v > 0) return v + ' hour' + (v > 1 ? 's' : '') + ' ago';
  v = Math.floor(diff / 60); diff -= v * 60;
  if (v > 0) return v + ' minute' + (v > 1 ? 's' : '') + ' ago';
  return 'Just now';
};

$.fn.toRelativeTime = function() {
  var t = $(this), x = Math.round(Date.parse(t.text()) / 1000);
  if (x) t.text($.getRelativeTime(Math.round(
  new Date().getTime() / 1000) - x));
};

$.toRelativeTime = function(s) { $(s).each(function() { 
  $(this).toRelativeTime(); 
}); };

function getRelativeTime(diff) {
  var v = Math.floor(diff / 86400); diff -= v * 86400;
  if (v > 0) return (v == 1 ? 'Yesterday' : v + ' days ago');
  v = Math.floor(diff / 3600); diff -= v * 3600;
  if (v > 0) return v + ' hour' + (v > 1 ? 's' : '') + ' ago';
  v = Math.floor(diff / 60); diff -= v * 60;
  if (v > 0) return v + ' minute' + (v > 1 ? 's' : '') + ' ago';
  return 'Just now';
};

function ConvertTimeStamp(pDateTime){
    // Split timestamp into [ Y, M, D, h, m, s ]
    var t = pDateTime.split(/[- :]/);
    
    // Apply each element to the Date function
    var d = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
    
    return d;
    // -> Wed Jun 09 2010 13:12:01 GMT+0100 (GMT Daylight Time)
}

function ReplaceURLWithHTMLLinks(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
    return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
}

// If the browser has a console, write to it.
function DebugOut(newline){
    try{
        if (typeof console == "object"){ 
            //console.log(newline);
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
