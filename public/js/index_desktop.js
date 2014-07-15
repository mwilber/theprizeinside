var LOCATION_CK_INTERVAL = 15000;
var DISTANCE_CHANGE_REFRESH_THRESHOLD = 10;
var CHECKIN_NOTIFICATION_THRESHOLD = 0.05;

var apipath = "http://theprizeinside.com";
//var apipath = "http://gibson.loc/theprizeinside/public";
//var apipath = "https://rippleapi.herokuapp.com/xhr_proxy?tinyhippos_apikey=ABC&tinyhippos_rurl=https%3A//theprizeinside.com";
//var apipath = "http://localhost/theprizeinside/public";
var isMobile = false;

var wallmap = null;
var wallmaptimer = null;
var userLocation = new google.maps.LatLng(0,0);
var autoCkLocation = new google.maps.LatLng(0,0);
var locationTimer;
var lsUserId = 0;
var prizedata = null;
var fsdata = new Array();
//prizedata = [{"restaurantId":"1","restaurantAlias":"mcd","restaurantColor":"ed947d","restaurantName":"Mc Donald's","restaurantUrl":"http:\/\/www.happymeal.com\/en_US\/index.html#\/Toys","restaurantDataUrl":"http:\/\/www.happymeal.com\/en_US\/config\/flash.xml","restaurantTimeStamp":"2013-06-02 04:41:50","prize":[{"prizeId":"571","prizeName":"Adventure Time","prizeImage":"","prizeGender":"M","prizeLink":"","prizeActive":"1","restaurantId":"1","prizeTimeStamp":"2014-01-04 07:12:09"},{"prizeId":"581","prizeName":"paul frank","prizeImage":"","prizeGender":"F","prizeLink":"","prizeActive":"1","restaurantId":"1","prizeTimeStamp":"2014-01-04 07:12:30"}]},{"restaurantId":"2","restaurantAlias":"bk","restaurantColor":"f6c68d","restaurantName":"Burger King","restaurantUrl":"http:\/\/www.bkcrown.com\/Toys\/Default.aspx","restaurantDataUrl":"http:\/\/www.bkcrown.com\/toys\/Default.aspx","restaurantTimeStamp":"2013-03-24 20:45:54","prize":[{"prizeId":"591","prizeName":"Pac-Man","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"2","prizeTimeStamp":"2014-01-04 07:13:02"}]},{"restaurantId":"3","restaurantAlias":"bell","restaurantColor":"87cec7","restaurantName":"Taco Bell","restaurantUrl":"http:\/\/www.tacobell.com\/food\/menu\/kids-meals","restaurantDataUrl":"http:\/\/www.tacobell.com\/food\/menu\/kids-meals\/","restaurantTimeStamp":"2013-03-25 17:49:33","prize":[]},{"restaurantId":"4","restaurantAlias":"snc","restaurantColor":"87a7d8","restaurantName":"Sonic Drive-In","restaurantUrl":"http:\/\/mywackypack.com\/promotions.aspx","restaurantDataUrl":"http:\/\/www.sonicdrivein.com\/kids\/wackyPackToys.jsp","restaurantTimeStamp":"2013-03-25 17:50:48","prize":[{"prizeId":"601","prizeName":"Kidz Bop","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"4","prizeTimeStamp":"2014-01-04 07:13:25"}]},{"restaurantId":"5","restaurantAlias":"sub","restaurantColor":"a7d69d","restaurantName":"Subway","restaurantUrl":"http:\/\/subwaykids.com","restaurantDataUrl":"http:\/\/subwaykids.com\/grownups\/promotions\/kidsmeals.aspx","restaurantTimeStamp":"2013-03-24 20:47:05","prize":[{"prizeId":"541","prizeName":"Frozen","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"5","prizeTimeStamp":"2013-12-01 05:24:17"}]},{"restaurantId":"6","restaurantAlias":"wnd","restaurantColor":"fff99d","restaurantName":"Wendy's","restaurantUrl":"http:\/\/www.wendys.com","restaurantDataUrl":"-","restaurantTimeStamp":"2013-06-02 04:41:43","prize":[{"prizeId":"611","prizeName":"Surprise Toy","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"6","prizeTimeStamp":"2014-01-13 03:29:42"}]},{"restaurantId":"11","restaurantAlias":"cfa","restaurantColor":"dddddd","restaurantName":"Chick-fil-A","restaurantUrl":"http:\/\/www.chick-fil-a.com\/Kids\/Meal","restaurantDataUrl":"","restaurantTimeStamp":"2013-03-30 02:28:30","prize":[{"prizeId":"471","prizeName":"Amazing Animals Books","prizeImage":"","prizeGender":"N","prizeLink":"","prizeActive":"1","restaurantId":"11","prizeTimeStamp":"2013-11-01 21:17:13"}]}];
var gaPlugin = false;

var checkinpops = null;
var checkinpopsidx = 0;

var dict = {
	en:{
		checkinPublic:"Post my name and location on The Prize Inside website.",
		checkinAnonymous:"Do not post my name and location on The Prize Inside website.",
		commentDefault:"Comment"
	}
};

var lang = dict.en;

// Store object refs for each UI panel.
// Arr idx matches html id of panel
var panel = Array();


function AppInit(){
    DebugOut('initing app');
	panel['prize'] = new Prize();
    panel['home'] = new Home();
	panel['checkin'] = new Checkin();
	panel['checkindetail'] = new CheckinDetail();
	panel['location'] = new Location();
	panel['userlocation'] = new UserLocation();
	//panel['userprofile'] = new UserProfile();
	//panel['userlogin'] = new UserLogin();
	panel['info'] = new Info();
	panel['app'] = new App();
	panel['locationoptions'] = new LocationOptions();
	panel['checkinpop'] = new CheckinPop();
	panel['share'] = new Share();

    panel['home'].Load();
}

function AdInit(){
	admob.createBannerView(
    	{
    		'publisherId': 'ca-app-pub-9860806024628930/2903343809',
    		'adSize': admob.AD_SIZE.BANNER
    	},
    	HandleAdSuccess,
    	HandleAdFail
	);
}

function WallMapInit(){
	
	$('#wallmap').show();
	
	var latlng = new google.maps.LatLng(40.6687125,-73.5270709);
    var myOptions = {
      zoom: 12,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      streetViewControl: false,
      disableDefaultUI: true
    };
    
    wallmap = new google.maps.Map(document.getElementById("wallmap"), myOptions);
    
    panel['prize'].locmap = wallmap;
    
    google.maps.event.addListenerOnce( wallmap, 'idle', function() {
	    GetCheckinPops();
	});
    
    
}

function GetCheckinPops(){
	ClearCheckinPops();
	$.get(apipath+'/reactor/srvlist/getcheckinsbyrecent/',HandleCheckinPops);
}

function ClearCheckinPops(){
	clearInterval(wallmaptimer);
}

function HandleCheckinPops(response){
	//console.log(response);
	if( response.checkins.length > 0 ){
		checkinpops = response.checkins;
		panel['checkinpop'].Load(checkinpops[checkinpopsidx].checkinId);
		
		wallmaptimer = setInterval(function(){
			panel['checkinpop'].panel.elem.hide();
			if( checkinpopsidx < checkinpops.length-1){
				checkinpopsidx++;
			}else{
				checkinpopsidx = 0;
			}
			panel['checkinpop'].Load(checkinpops[checkinpopsidx].checkinId);
			
			
		},6000);
	}
}

function HandleAdSuccess(){
	DebugOut('ad init success.');
	admob.requestAd(
	     {
	       'isTesting': false,
	       'extras': {
	         'color_bg': 'AAAAFF',
	         'color_bg_top': 'FFFFFF',
	         'color_border': 'FFFFFF',
	         'color_link': '000080',
	         'color_text': '808080',
	         'color_url': '008000'
	       },
	     },
	     function(){DebugOut('handle ad success!');},
	     function(){DebugOut('handle ad fail');}
	 );
}

function HandleAdFail(){
	DebugOut('ad init failed.');
}

function GetFSData(){
    DebugOut('getting fs data: ');
    for( idx in prizedata ){
        var value = prizedata[idx];
        $.get('https://api.foursquare.com/v2/venues/search?client_id=UMRUA4UFFY0RLEI1TKGXUT30JLQULNFRM3YVQWNCASQ3VE31&client_secret=4XSWL2PUIN02A3RNJY4GFRCLISF4RPC3URLVLHK2AOQD0EQ5&v=20140128&ll='+userLocation.lat()+','+userLocation.lng()+'&limit=10&query='+value.restaurant.restaurantName,HandleFSData(value));
    }
}

function HandleFSData(pRest){
    return function(response){
        DebugOut("FS Data Incoming...");
        //DebugOut(pRest);
        //DebugOut(response);
        fsdata[pRest.restaurant.restaurantAlias] = response;
        DebugOut(fsdata);
        var patsy = panel['prize'].HandleLocationData(panel['prize']);
    	patsy(fsdata[panel['prize'].restaurantalias]);
    };
    
}

function HandleLogin(pProfile){
	alert("got it");
	
	DebugOut(pProfile);
}