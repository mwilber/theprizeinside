<?php

	$social = array();
	$social['title'] = "The Prize Inside";
	$social['description'] = "When you're out on the road, The Prize Inside uses your location to find nearby restaurants that have kids meal premiums. Plan a meal stop around the prize you want most. The Prize inside provides driving directions to the location. Share with your finds on The Prize Inside website! Make The Prize Inside part of your next road trip.";
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
		<meta name="twitter:description" content="When a burger is a burger, choose your fast food by The Prize Inside!">
		<meta name="twitter:creator" content="@tpiapp">
		<meta name="twitter:image:src" content="<?=$social['image']?>">
		<meta name="twitter:domain" content="theprizeinside.com">
		
		<!-- Twitter App Card -->
		<meta name="twitter:card" content="app">
		<meta name="twitter:app:id:iphone" content="id650582612">
		<meta name="twitter:app:id:ipad" content="id650582612">
		<meta name="twitter:app:id:googleplay" content="com.greenzeta.greenzeta.theprizeinside">
        
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700&subset=latin,greek' rel='stylesheet' type='text/css'>
		<link type="text/css" href="css/jquery.jscrollpane.css" rel="stylesheet" media="all" />
        <link rel="stylesheet" href="css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="css/index.css" />
        <link rel="stylesheet" type="text/css" href="css/index_desktop.css" />
        <title>The Prize Inside</title>
        
        <script type="text/javascript">
		var social = [];
			social['title'] = "The Prize Inside";
			social['description'] = "Choose your fast food by the prize inside.";
			social['image'] = "http://theprizeinside.com/img/fb_icon.png";
			social['link'] = "http://theprizeinside.com/";
			
		</script>
    </head>
    <body>
        <div id="header" class="header">
        	<img id="homeview" src="img/homebanner.jpg"/>
        	<a id="logo" href="index.php" style="display:block;"><img src="img/logo.png"></a>
        	<a class="showapp fa fa-mobile-phone" style="right:300px; width: auto;" target="_blank"> <span style="font-size:18px;">Get the App!</span></a>
        	<a class="showtweeter fa fa-twitter" href="#" onclick="window.open('http://www.twitter.com/tpiapp', '_system'); return false;" style="right:200px;"> </a>
			<a class="showuserlocation fa fa-location-arrow" target="_blank"> </a>
			<a class="showinfo fa fa-info-circle" target="_blank"> </a>
        </div>
        
        <div id="wallmap"></div>
        
        <div id="info" class="popup">
			<a class="close" href="#"><span class="fa fa-times"></span></a>
			<h1>Privacy Policy</h1>
			<div id="aboutbox" class="scroll-pane">
				<p>
		 			The Prize Inside does not collect any personal information from users of this app. Anonymous statistics are collected only for counting total users and total searches made.
		 		</p>
		 		<p>
		 			 The Prize Inside uses your location to display nearby fast food restaurants. Location information provided to The Prize Inside is used directly in your browser and not stored in any form.
		 		</p>
		 		<p>
		 			<a href="index.php">Back to the app.</a>
		 		</p>
			</div>
		</div>
        
        <div id="footer">
        	<a href="#" onclick="window.open('http://www.greenzeta.com/home/listing/product', '_system'); return false;" class="gz">
				<span class="badge">&zeta;</span>
				&nbsp;&nbsp;A GreenZeta Production
			</a>
        </div>
        
        <script type="text/javascript" src="js/jquery-1.10.1.min.js"></script>
        <script type="text/javascript" src="js/jquery.mousewheel.js"></script>
        <script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=true"></script>

		<script src="js/cPanel.js"></script>
	    <script src="js/cPopup.js"></script>
	    <script src="js/cMessageBox.js"></script>
		<script src="js/cHome.js"></script>
		<script src="js/cPrize.js"></script>
		<script src="js/cLocation.js"></script>
	    <script src="js/cCheckin.js"></script>
	    <script src="js/cCheckinDetail.js"></script>
	    <script src="js/cUserLocation.js"></script>
	    <script src="js/cUserProfile.js"></script>
	    <script src="js/cUserLogin.js"></script>
	    <script src="js/cInfo.js"></script>
	    <script src="js/cApp.js"></script>
	    <script src="js/cLocationOptions.js"></script>
		
		<script type="text/javascript" src="js/util.js"></script>
        <script type="text/javascript" src="js/index_desktop.js"></script>
        <script type="text/javascript">
        	$(document).ready(function(){

				WallMapInit();
				
        	});
        </script>
    </body>
</html>
