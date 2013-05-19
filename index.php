<?php

	$social = array();
	$social['title'] = "The Prize Inside";
	$social['description'] = "Choose your fast food by the prize inside.";
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
	<meta name="twitter:title" content="<?=$social['title']?>">
	<meta name="twitter:description" content="<?=$social['description']?>">
	<meta name="twitter:creator" content="@greenzeta">
	<meta name="twitter:image:src" content="<?=$social['image']?>">
	<meta name="twitter:domain" content="theprizeinside.com">
	

	<meta name="viewport" content="width=device-width">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<link rel="apple-touch-startup-image" href="/startup.png">
	<link href='http://fonts.googleapis.com/css?family=Vollkorn:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Ultra' rel='stylesheet' type='text/css'>
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

  </head>
  <body>
  	<div id="loader">
  		<h1>Loading...</h1>
  		<div class="progress progress-warning">
			<div class="bar" style="width: 0%;"></div>
		</div>
		<div class="message">Getting prizes</div>
  	</div>
  	<div id="aboutbox" class="float-panel">
		<a id="btnclose" href="#" onclick="return false;"><img src="img/btn_close.png"/></a>
		<h2>About The Prize Inside</h2>
		<div id="about" class="scroll-pane">
			<p>Choose your fast food by the prize inside! Quickly find out what's in the kids' meal at nearby fast food restaurants. Click on each prize to zoom in the map and get the restaurant address or click on "Directions" for driving directions.</p>
			<p>The Prize Inside was created by Internet software developer Matthew Wilber. For more information, visit <a href="http://www.mwilber.com" target="_blank">mwilber.com</a>.</p>
			<strong>Mobile Users</strong>
			<p>Android users can find The Prize Inside in the <a href="https://play.google.com/store/apps/details?id=com.greenzeta.greenzeta.theprizeinside" target="_blank">Google Play Store</a>.</p>
			<p>iPhone users can use this site as a web app. First you must enable location awareness in mobile safari by going to Settings->Privacy->Location Services and turn on Safari. Then open safari and go to ThePrizeInside.com. When prompted, allow The Prize Inside to use your current location. Finally, install the web app by tapping the share button and selecting "Add to Home Screen"</p>
		</div>
	</div>
	<div id="locationbox" class="float-panel">
		<a id="btncloseloc" href="#" onclick="return false;"><img src="img/btn_close.png"/></a>
		<h2>Change Location</h2>
		<p>Enter an address to search:</p>
		<form id="setloc">
			<input id="loctext" value=""/>
			<a id="btnlocsearch" href="#" class="btn" onclick="return false;">Search</a>
		</div>
	</div>
  	<div id="header">
  		<img id="logo" src="img/logo.png"/>
  		<div id="title">The Prize Inside</div>
  		<a id="info" href="#" onclick="return false;"><i class="icon-info-sign"></i></a>
  		<a id="appmobi" href="#" onclick="return false;"><i class="icon-mobile-phone"></i><span>Get The App!</span></a>
    	<div class="clearfix"></div>
  	</div>
  	<a id="location" href="#" onclick="return false;">Location: <span></span></a>
	<div id="overmap"></div>
	<div id="geoModal" class="arrow_box">
	  <div class="header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true" onclick="$(this).parent().parent().fadeOut();"><img src="img/btn_close.png"/></button>
	    <h3>Location Not Found</h3>
	  </div>
	  <div class="body">
	    <p>Manually set your location by tapping the coordinates above. For the optimal experience, use a browser that is location aware and grant The Prize Inside access to your location.</p>
	  	<p><a href="policy.html">Privacy Policy</a></p>
	  </div>
	  <!--<div class="modal-footer">
	    <a href="#" class="btn" onclick="$('#geoModal').modal('hide');">Close</a>
	    <a href="#" class="btn btn-primary" onclick="QueryLocation();">Get Location</a>
	  </div>-->
	</div>
	<div id="appModal" class="modal hide fade">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	    <h3>Mobile Apps</h3>
	  </div>
	  <div class="modal-body">
	    <a style="float:left; width:auto;" href="https://play.google.com/store/apps/details?id=com.greenzeta.greenzeta.theprizeinside" target="_blank"><img src="img/playstore.png" style="height:55px;"/></a>
	  </div>
	  <!--<div class="modal-footer">
	    <a href="#" class="btn" onclick="$('#geoModal').modal('hide');">Close</a>
	    <a href="#" class="btn btn-primary" onclick="QueryLocation();">Get Location</a>
	  </div>-->
	</div>
	<ul id="listlist" class="unstyled">
		
	</ul>
	<div id="footer">
		<div id="likegroup">
      		<div class="fb-like" data-href="http://theprizeinside.com/" data-send="false" data-layout="button_count" data-width="90" data-show-faces="false"></div>
			<g:plusone size="medium" href="http://theprizeinside.com/"></g:plusone>
			<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://theprizeinside.com/" data-text="The Prize Inside - Choose your fast food by the prize inside." data-hashtags="fastfood">Tweet</a>
    	</div>
    	<a id="gzlink" href="http://www.greenzeta.com" target="_blank">A GreenZeta Production</a>
    	<a id="policylink" href="policy.html">Privacy Policy</a>
   	</div>
    <div id="fb-root"></div>
	<div id="map"></div>
    
    <script type="text/javascript" src="https://connect.facebook.net/en_US/all.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=true"></script>
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!-- the mousewheel plugin -->
	<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
	<!-- the jScrollPane script -->
	<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
    <script src="js/fb.js"></script>
    <script src="js/script.js"></script>
    
    <script type="text/javascript">
		
		$(document).ready(function(){
			
			//if( !isMobile ){
				FB.init({appId: FBconfig.app.id, status : true, cookie: true, xfbml : true});
				SetFrame();
			//}
			
			$('#btnlocsearch').click(function(){
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
	<script type="text/javascript">
	  (function() {
	    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
	    po.src = 'https://apis.google.com/js/plusone.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	  })();
	</script>
	<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
  </body>
</html>