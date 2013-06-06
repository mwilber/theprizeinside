<?php

	$social = array();
	$social['title'] = "The Prize Inside";
	$social['description'] = "When you're out on the road, The Prize Inside uses your phone's GPS to locate nearby restaurants that have kids' meal premiums. Toys are listed in order of distance along with alternate locations within 20 miles. Plan your stop around the prize your kids want most and The Prize inside provides driving directions to the location. Share with your finds on facebook, twitter, and now google plus! Make The Prize Inside part of your next road trip.";
	$social['image'] = "http://theprizeinside.com/img/fb_icon.png";
	$social['link'] = "http://theprizeinside.com/";

?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title><?=$social['title']?></title>
	<meta name="description" content="<?=$social['description']?>">
	<meta name="author" content="Matthew Wilber">
	<meta property="og:title" content="<?=$social['title']?>" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="<?=$social['link']?>" />
	<meta property="og:image" content="<?=$social['image']?>" />
	<meta property="og:site_name" content="<?=$social['title']?>" />
	<meta property="fb:admins" content="631337813" />
	<meta property="og:description" content="<?=$social['description']?>" />
	
	
	<!-- Twitter Summary Card -->
	<meta name="twitter:card" content="summary">
	<meta name="twitter:site" content="@greenzeta">
	<meta name="twitter:title" content="<?=$social['title']?>">
	<meta name="twitter:description" content="When a burger is a burger, and a burrito makes no difference, choose your fast food by The Prize Inside!">
	<meta name="twitter:creator" content="@tpiapp">
	<meta name="twitter:image:src" content="<?=$social['image']?>">
	<meta name="twitter:domain" content="theprizeinside.com">
	
	<!-- Twitter App Card -->
	<meta name="twitter:card" content="app">
	<meta name="twitter:app:id:iphone" content="id650582612">
	<meta name="twitter:app:id:ipad" content="id650582612">
	<meta name="twitter:app:id:googleplay" content="com.greenzeta.greenzeta.theprizeinside">
	

	<meta name="viewport" content="width=device-width">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<link rel="apple-touch-startup-image" href="/startup.png">
	<link href='http://fonts.googleapis.com/css?family=Coustard:900' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>

	<link type="text/css" href="css/jquery.jscrollpane.css" rel="stylesheet" media="all" />
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link href="css/style.css" rel="stylesheet" media="screen">
    
    <script type="text/javascript" src="js/config.js"></script>
	<script type="text/javascript">
		var social = [];
		social['title'] = "The Prize Inside";
		social['description'] = "Choose your fast food by the prize inside.";
		social['image'] = "http://theprizeinside.com/img/fb_icon.png";
		social['link'] = "http://theprizeinside.com/";
		
	</script>
	
	<script src="js/vendor/modernizr-2.6.2.min.js"></script>

  </head>
  <body>
  	<div id="appModal" class="modal hide fade">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	    <h3>The Prize Inside Apps</h3>
	  </div>
	  <div class="modal-body">
	    <a style="float:left; width:auto;" href="https://play.google.com/store/apps/details?id=com.greenzeta.greenzeta.theprizeinside" target="_blank"><img src="img/playstore.png" style="height:55px;"/></a>
	    <a style="float:left; width:auto;" href="https://chrome.google.com/webstore/detail/the-prize-inside/dhifcjdhfplggpmnlfmgockjchmpcfkb" target="_blank"><img src="img/chromestore.png" style="height:55px;"/></a>
	   	<a style="float:left; width:auto;" href="https://itunes.apple.com/us/app/the-prize-inside/id650582612?ls=1&mt=8" target="_blank"><img src="img/appstore.png" style="height:55px;"/></a>
	  </div>
	  <!--<div class="modal-footer">
	    <a href="#" class="btn" onclick="$('#geoModal').modal('hide');">Close</a>
	    <a href="#" class="btn btn-primary" onclick="QueryLocation();">Get Location</a>
	  </div>-->
	</div>
  	<div id="loader">
  		<h1>Loading...</h1>
  		<div class="progress progress-warning">
			<div class="bar" style="width: 0%;"></div>
		</div>
		<div class="message">Getting prizes</div>
  	</div>
  	
  	<!-- BOUT BOX -->
  	<div id="aboutbox" class="float-panel">
		<a id="btnclose" class="close" href="#" onclick="return false;"><i class="icon-remove"></i></a>
		<h2>About The Prize Inside</h2>
		<div id="about" class="scroll-pane">
			<p>When a burger is a burger, and a burrito makes no difference, choose your fast food by The Prize Inside!</p>
			<p>When you&rsquo;re out on the road, The Prize Inside uses your phone&rsquo;s GPS to locate nearby restaurants that have kids&rsquo; meal premiums. Toys are listed in order of distance along with alternate locations within 20 miles. Plan your stop around the prize your kids want most and The Prize inside provides driving directions to the location. Share with your finds on facebook, twitter, and now google plus! Make The Prize Inside part of your next road trip.</p>
			<p>The Prize Inside was created by Internet software developer Matthew Wilber. For more information, visit <a href="http://www.mwilber.com" target="_blank">mwilber.com</a>.</p>
			<strong>Mobile Users</strong>
			<p>Download the app linked above or use this site as a web app: </p>
			<strong>iPhone/iPad</strong>
			<p>First you must enable location awareness in mobile safari by going to Settings->Privacy->Location Services and turn on Safari. Then open safari and go to ThePrizeInside.com. When prompted, allow The Prize Inside to use your current location. Finally, install the web app by tapping the share button and selecting "Add to Home Screen"</p>
		</div>
	</div>
	
	<!-- LOCATION BOX -->
	<div id="locationbox" class="float-panel">
		<a id="btncloseloc" class="close" href="#" onclick="return false;"><i class="icon-remove"></i></a>
		<a id="location" href="#" onclick="return false;">Location: <span></span></a>
		<h2>Change Location</h2>
		<p>Enter an address to search:</p>
		<form id="setloc" onsubmit="$('#btnlocsearch').trigger('click'); return false;">
			<input id="loctext" value=""/>
			<a id="btnlocsearch" href="#" class="btn" onclick="return false;">Search</a>
		</div>
	</div>
	
	<!-- LOCATION NOT FOUND -->
	<div id="geoModal" class="arrow_box float-panel">
	  <div class="header">
	    <a class="close" onclick="$(this).parent().parent().fadeOut();"><i class="icon-remove"></i></a>
	    <h3>Location Not Found</h3>
	  </div>
	  <div class="body">
	    <p>Manually set your location by tapping the navigation icon above. For the optimal experience, use a browser that is location aware and grant The Prize Inside access to your location.</p>
	  	<p><a href="policy.html" onclick="gaq.push(['_trackEvent', 'No Location', 'policy', 'click']);">Privacy Policy</a></p>
	  </div>
	</div>
	
	
	<!-- INFO BOX -->
	<div id="infobox" class="float-panel arrow_box info_box">
		<a id="btncloseinfo" class="close" href="#" onclick="infoBubble.close(); _gaq.push(['_trackEvent', 'Detail', 'close', '']); return false;"><i class="icon-remove"></i></a>
		<h2 class="prize"></h2>
		<div class="restaurant"></div> <div class="distance"></div>
		<a class="extlink btn" href="http://www.wendys.com/kids_meal/" target="_blank"><i class="icon-globe"></i>&nbsp;Website</a>
		<div class="address"></div>
		<a class="directions btn" href="#" target="_blank"><i class="icon-road"></i>&nbsp;Driving Directions</a>
		<div class="btn-group socialgroup">
			<a id="twshare" href="#" class="btn" onclick="return:false;"><i class="icon-twitter"></i></a>
			<a id="fbshare" href="#" class="btn" onclick="return:false;"><i class="icon-facebook"></i></a>
			<a id="gpshare" href="#" class="btn" onclick="return:false;"><i class="icon-google-plus"></i></a>
		</div>
	</div>
	
	
  	<div id="header">
  		<img id="logo" src="img/logo.png"/>
  		<div id="title">The Prize Inside</div>
  		<a id="info" href="#" onclick="return false;" style="margin-right:0px;"><i class="icon-info-sign"></i></a>
  		<a id="loc" href="#" onclick="return false;"><i class="icon-location-arrow"></i></a>
  		<a id="twitterfeed" href="http://www.twitter.com/tpiapp" onclick="" target="_blank"><i class="icon-twitter"></i></a>
  		<a id="appmobi" href="#" onclick="return false;"><i class="icon-mobile-phone"></i><span>Get The App!</span></a>
    	<div class="clearfix"></div>
  	</div>
  	
	<div id="overmap"></div>
	<a id="listshow" href="#" onclick="return false;"><img src="img/listshow.png"></a>
	<ul id="listlist" class="unstyled">
		
	</ul>
	<div id="footer">
    	<a id="gzlink" href="http://www.greenzeta.com" onclick="gaq.push(['_trackEvent', 'Footer', 'greenzeta', 'click']);" target="_blank">A GreenZeta Production</a>
    	<a id="policylink" href="policy.html" onclick="gaq.push(['_trackEvent', 'Footer', 'policy', 'click']);">Privacy Policy</a>
   	</div>
	<div id="map"></div>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=true"></script>
    <script src="js/infobubble-compiled.js"></script>
    <script src="js/vendor/jquery-1.9.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!-- the mousewheel plugin -->
	<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
	<!-- the jScrollPane script -->
	<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
    <script src="js/fb.js"></script>
    <script src="js/script.js"></script>
    
    <script type="text/javascript">
		
		$(document).ready(function(){
			
			$('#btnlocsearch').click(function(){
				_gaq.push(['_trackEvent', 'Main Nav', 'location search', '']);
				var searchloc = $('#loctext').val();
				DebugOut('getting coords for: '+searchloc);
				
				var geocoder = new google.maps.Geocoder();
				geocoder.geocode( { 'address': searchloc}, function(results, status) {
		        	if (status == google.maps.GeocoderStatus.OK) {
		        		$('#locationbox').fadeOut();
		        		HandleGeolocationQuery({coords:{latitude:results[0].geometry.location.lat(), longitude:results[0].geometry.location.lng()}});
		        	} else {
		        		alert('Could not find address: ' + status);
		        	}
		        });
			});
			
			InitMap();
			QueryLocation();
			
		});
	</script>
	
	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', 'UA-76054-17']);
	  _gaq.push(['_trackPageview']);
	
	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();
	
	</script>
  </body>
</html>