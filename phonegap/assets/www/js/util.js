/////////////////////////////////////////////////////////////////////////////
//  Utility Functions
/////////////////////////////////////////////////////////////////////////////

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
    //if( CalcDistance(userLocation.lat(), userLocation.lng(),position.coords.latitude,position.coords.longitude) > 1){
        userLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        DebugOut('user location set: '+position.coords.latitude+', '+position.coords.longitude);
        //GetLocationData();
        GetFSData();
        //$('#location span').html(position.coords.latitude.toString().substring(0,8)+', '+position.coords.longitude.toString().substring(0,8));
    //}else{
    //    DebugOut('User Location Unchanged');
    //}
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
    
    //if( testLocFallbackOn ){
        DebugOut('location error');
        //_gaq.push(['_trackEvent', 'Load', 'location', 'setfallback']);
        // Set a fallback location 40.7406941, -73.9905943 
        // Location: 40.67857830000001, -73.5421847
        HandleGeolocationQuery({coords:{latitude:40.67857830000001,longitude:-73.5421847}});
        //HandleGeolocationQueryLoop({coords:{latitude:38.021558,longitude:-77.51307}});
    //}
} 

function fbshare(pTitle, pDescription){
    
    var fbcontent = "https://www.facebook.com/dialog/feed?app_id=567792933313140&link="+escape(social['link'])+"&picture="+escape(social['image'])+"&name="+escape(pTitle)+"&caption="+escape(pTitle)+"&description="+escape(pDescription)+"&redirect_uri=https://facebook.com/";
    //openpopup(fbcontent,'facebook',1000,450);
    //navigator.app.loadUrl(url, { openExternal:true });
    window.open(fbcontent, '_system');
    //_gaq.push(['_trackEvent', 'Share', 'facebook', '']);
    return false;
}

function twshare(pTitle){
	//alert('error 201');
    //DebugOut('twshare');
    var twurl = "https://mobile.twitter.com/compose/tweet?status="+escape(pTitle)+escape(": ")+escape(social['link']);
    //openpopup(twurl,'tweeters',550,450);
    //(url, { openExternal:true });
    //alert('error 201: '+twurl);
    window.open(twurl, '_system');
    //_gaq.push(['_trackEvent', 'Share', 'twitter', '']);
    return false;
}

function gpshare(){
    var url = "https://plus.google.com/share?url="+escape(social['link'])+"&description="+escape(social['description'])+" "+escape(social['link']);
    openpopup(url,'gplus',550,450);
    //_gaq.push(['_trackEvent', 'Share', 'googleplus', '']);
    return false;
}

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
