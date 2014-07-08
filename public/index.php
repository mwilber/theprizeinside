<?php

	$social = array();
	$social['title'] = "The Prize Inside";
	$social['description'] = "When a burger is a burger, and fries make no difference, choose your fast food by The Prize Inside!";
	$social['image'] = "http://theprizeinside.com/img/fb_icon.png";
	$social['link'] = "http://theprizeinside.com/";
	
	if(isset($_GET['ck'])){
	
		include('reactor/application/config/constants.php');
		include('reactor/application/config/database.php');
		include('reactor/application/helpers/idobfuscator_helper.php');
		
		$_GET['ck'] = IdObfuscator::decode($_GET['ck']);
		
		//echo $_GET['ck'];
		
		$conn = mysql_connect($db['default']['hostname'], $db['default']['username'], $db['default']['password']) 
	  		or die("Unable to connect to MySQL");
			
		//select a database to work with
		$dbc = mysql_select_db($db['default']['database'],$conn) 
		  or die("Could not select examples");
	
		$checkinRS = mysql_query("SELECT tblCheckin.checkinId,checkinLat,checkinLng,checkinComment,checkinPhoto,checkinTimeStamp,restaurantName,prizeName,profileNickname,profilePicture FROM tblCheckin INNER JOIN tblRestaurant ON tblCheckin.restaurantId=tblRestaurant.restaurantId INNER JOIN tblPrize ON tblCheckin.prizeId=tblPrize.prizeId INNER JOIN tblProfile ON tblCheckin.profileId=tblProfile.profileId WHERE checkinId=".$_GET['ck']);
		$checkin = mysql_fetch_assoc($checkinRS);
		
		if( $checkin['prizeName'] == "" ){
			$checkin['prizeName']=$social['title'];
		}else{
			$social['title'] = $checkin['prizeName'];
		}
		
		if( $checkin['checkinPhoto'] == "" ){
			$checkin['checkinPhoto']=$social['image'];
		}else{
			$social['image'] = $checkin['checkinPhoto'];
		}
	}

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
		<meta name="twitter:description" content="When a burger is a burger, and fries make no difference, choose your fast food by The Prize Inside!">
		<meta name="twitter:creator" content="@tpiapp">
		<meta name="twitter:image:src" content="<?=$social['image']?>">
		<meta name="twitter:domain" content="theprizeinside.com">
		
		<!-- Twitter App Card -->
		<meta name="twitter:card" content="app">
		<meta name="twitter:app:id:iphone" content="id650582612">
		<meta name="twitter:app:id:ipad" content="id650582612">
		<meta name="twitter:app:id:googleplay" content="com.greenzeta.greenzeta.theprizeinside">
        
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
		<link href='fonts/opensans_regular_macroman/stylesheet.css' rel='stylesheet' type='text/css'>
		<link href='fonts/opensans_bold_macroman' rel='stylesheet' type='text/css'>
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
    	<img id="logo" src="img/logo.png">
        <div id="header" class="header">
        	<img id="homeview" src="img/homebanner.jpg"/>
        	<a class="showapp fa fa-mobile-phone" style="right:300px; width: 200px;" target="_blank"> <span style="font-size:18px;">Get the App!</span></a>
        	<a class="showtweeter fa fa-twitter" href="#" onclick="window.open('http://www.twitter.com/tpiapp', '_system'); _gaq.push(['_trackEvent', 'External', 'Twitter', '']); return false;" style="right:200px;"> </a>
			<a class="showuserlocation fa fa-location-arrow" target="_blank"> </a>
			<a class="showinfo fa fa-info-circle" target="_blank"> </a>
        </div>
        
        <div id="wallmap"></div>
        
        <div id="info" class="popup">
			<a class="close" href="#"><span class="fa fa-times"></span></a>
			<h1>About</h1>
			<div id="aboutbox" class="scroll-pane">
				<p>When a burger is a burger, and fries make no difference, choose your fast food by The Prize Inside!</p>
				<p>The Prize Inside helps you find a place to eat based on their kids&rsquo; meal premiums. Find the prize you want and locate the nearest restaurant. Browse other user&rsquo;s comments before you go. While you&rsquo;re there, use the mobile app to share your find on The Prize Inside website and social networks.</p>
				<p>The Prize Inside was created by Internet software developer Matthew Wilber. For more information, visit <a href="#" onclick="window.open('http://www.greenzeta.com', '_system'); _gaq.push(['_trackEvent', 'External', 'mwilber.com', '']); return false;">greenzeta.com</a>.</p>			
			</div>
		</div>
		
		<div id="app" class="popup">
			<a class="close" href="#"><span class="fa fa-times"></span></a>
			<h1>APPs</h1>
			<ul>
				<li><a href="https://play.google.com/store/apps/details?id=com.greenzeta.theprizeinside" target="_blank"><img src="img/playstore.png" style="height:55px;"/></a></li>
	    		<li><a href="http://www.amazon.com/GreenZeta-The-Prize-Inside/dp/B00DAFWEAG/" target="_blank"><img src="img/azstore.png" style="height:55px;"/></a></li>
	    		<li><a href="https://chrome.google.com/webstore/detail/the-prize-inside/dhifcjdhfplggpmnlfmgockjchmpcfkb" target="_blank"><img src="img/chromestore.png" style="height:55px;"/></a></li>
	   			<li><a href="https://itunes.apple.com/us/app/the-prize-inside/id650582612?ls=1&mt=8" target="_blank"><img src="img/appstore.png" style="height:55px;"/></a></li>
			</ul>
		</div>
		
		<div id="checkindetail" class="popup">
			<a class="close" href="#"><span class="fa fa-times"></span></a>
			<h1>Prize</h1>
			<p class="prizecomment"><?= (isset($checkin['checkinComment']))?$checkin['checkinComment']:'' ?></p>
			<img class="prizeimage" src="<?= (isset($checkin['checkinPhoto']))?$checkin['checkinPhoto']:'' ?>" />
			<h2 class="prizename"><?= (isset($checkin['prizeName']))?$checkin['prizeName']:'' ?></h2>
			<h3 class="restaurantname"><?= (isset($checkin['restaurantName']))?$checkin['restaurantName']:'' ?></h3>
			<img class="locationmap" style="<?php if($checkin['checkinLat'] == 0 && $checkin['checkinLng']==0) echo "display:none;" ?>" src="http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=150x150&maptype=roadmap&markers=color:red%7Clabel:C%7C<?= (isset($checkin['checkinLat']))?$checkin['checkinLat']:'' ?>,<?= (isset($checkin['checkinLng']))?$checkin['checkinLng']:'' ?>&sensor=false" />
			<div class="profile">
				<img class="avatar" src="<?= (isset($checkin['profilePicture']))?$checkin['profilePicture']:'' ?>"/>
				<div style="float:left;">
					<h2 class="nickname"><?= (isset($checkin['profileNickname']))?$checkin['profileNickname']:'' ?></h2>
					<div class="checkincount">
						<span class="number">&nbsp;</span> Prizes
					</div>
				</div>
			</div>
		</div>

        <div id="container">
 
			<div id="home" class="panel">
				<h1 class="name"><span class="mob">The Prize Inside</span><span class="dsk">Prizes</span></h1>
				<div class="header">
					<img id="homeview" src="img/homebanner.jpg"/>
					<a class="showapp fa fa-mobile-phone" style="right:75px; width: 200px;" target="_blank"> <span style="font-size:18px;">Get the App!</span></a>
					<a class="showuserprofile fa fa-user" target="_blank"> </a>
					<a class="showinfo fa fa-info-circle" target="_blank"> </a>
				</div>
				<div class="content">
				<ul class="prizes linearlist">
					<!-- AJAX Data here -->
				</ul>
				</div>
			</div>
			
			<div id="prize" class="panel">
				<a class="back" href="#"><span class="fa fa-angle-left"> </span></a>
				<h1 class="name"><!-- AJAX Data here --></h1>
				<div class="header">
					<img id="prizephoto" src=""/>
					<a class="showapp fa fa-mobile-phone" style="right:150px; width: 200px;" target="_blank"> <span style="font-size:18px;">Get the App!</span></a>
					<a class="showuserlocation fa fa-location-arrow" target="_blank"> </a>
				  	<a class="showwebsite fa fa-globe" target="_blank"> </a>
				  	<a class="showcheckin fa fa-thumbs-up"></a>
				</div>
				<div class="content">
				<ul class="tabs">
				  <li class="tablocations selected"><a id="btnlocations" href="#">Locations</a></li>
				  <li class="tabmap"><a id="btnmap" href="#">Map</a></li>
				  <li class="tabcomments"><a id="btncomments" href="#">Comments</a></li>
				</ul>
				<div id="locations" class="tabpanel">
				  <ul class="linearlist"><!-- AJAX Data here --></ul>
				</div>
			  <div id="map" class="tabpanel">
				Google Map Here
			  </div>
			  <div id="comments" class="tabpanel">
				<ul class="checkins linearlist"><!-- AJAX Data here --></ul>
			  </div> 
			  </div>
			</div>
			
			<div id="location" class="panel">
				<a class="back" href="#"><span class="fa fa-angle-left"></span></a>
				<h1 class="name"><!-- AJAX Data here --></h1>
				<div class="header">
					<img id="streetview" src=""/>
					<a class="showdirections fa fa-road"></a>
					<a class="showcheckin fa fa-thumbs-up"></a>
				</div>
				<div class="content">
					<div class="vcard">
						<p class="fn"><p>
						<p class="adr">
						<span class="street-address"></span> <span class="city"></span>, <span class="region"></span> <span class="postal-code"></span>
						<br>
						<span class="country-name"></span>
						</p>
						<p class="tel"></p>
					</div>
					<a class="mapdirections" href="#" target="_blank"><img id="staticmap" src=""/></a>
				</div>
			</div>
			
			<div id="checkin" class="popup">
				<a class="close" href="#"><span class="fa fa-times"></span></a>
				<h1>Share</h1>
				<p class="prizename"></p><a id="setpic" href="#"><img id="myImage" src="img/add_photo.png"/></a>
				<textarea id="checkinComment">Comment</textarea>
				
				<div style="margin: 1% 5%;">
					<img class="locationmap" src="" />
					<div id="checkinAnonymous" class="button toggle fa fa-square-o"></div>
					<label id="msgAnonymous">Do not post this location on The Prize Inside website.</label>
					<div class="clearfix socialbreak"></div>
					<div id="checkinTwitter" class="button share toggle selected fa fa-twitter"> </div>
					<div id="checkinFacebook" class="button share toggle selected fa fa-facebook"> </div>
					<div id="checkinFoursquare" class="button share toggle selected fa fa-foursquare"> </div>
				</div>
				<div class="clearfix"></div>
				<a id="btnCheckin" href="#" class="button">Share</a>
			</div>
			
			
			
			<div id="userprofile" class="popup">
				<a class="close" href="#"><span class="fa fa-times"> </span></a>
				<h1>Profile</h1>
				<div id="viewprofile">
					<div id="checkincount">
						<div class="number">&nbsp;</div>
						<span>Prizes</span>
					</div>
					<img class="avatar" src=""/>
					<div style="float:left;">
						<h2 class="nickname"></h2>
						<h3 class="name"></h3>
						<p class="profileid"></p>
						<a id="showedit" href="#">Edit</a>
					</div>
				</div>
				<div id="editprofile">
					<label>Nickname:</label> <input id="nickname" class="nickname" />
					<a id="showview" href="#" class="button fa fa-times"></a>
					<a id="btnsave" href="#" class="button fa fa-check" onclick="return false;"></a>
					<br/>
					<label>Name:</label> <input id="name" class="name" />
				</div>
				<div id="authprofile">
					<div style="float:left; width:50%;">
					<p>Currently signed in with:</p>
					<div id="authed"></div>
					</div>
					<div style="float:left;">
					<p id="addservicecopy">Add services to share:</p>
					<a id="addfacebook" href="#" class="button addservice fa fa-facebook-square" onclick="return false;"></a>
					<a id="addtwitter" href="#" class="button addservice fa fa-twitter-square" onclick="return false;"></a>
					<a id="addfoursquare" href="#" class="button addservice fa fa-foursquare" onclick="return false;"></a>
					</div>
				</div>
				<p class="historytitle">History</p>
				<div id="ckprofile">
					<ul class="checkins linearlist">
						<!-- AJAX Data here -->
					</ul>
				</div>
				<a id="btnlogout" href="#" class="button" onclick="return false;">Log Out</a>
			</div>
			
			<div id="userlogin" class="popup">
				<a class="close" href="#"><span class="fa fa-times"></span></a>
				<h1>Login</h1>
				<ul>
					<li><a id="btnfacebook" href="#" class="button fa fa-facebook-square" onclick="return false;"> facebook</a></li>
					<li><a id="btntwitter" href="#" class="button fa fa-twitter-square" onclick="return false;"> twitter</a></li>
					<li><a id="btnfoursquare" href="#" class="button fa fa-foursquare" onclick="return false;"> foursquare</a></li>
				</ul>
				<p class="policy">
					<a href="#" onclick="window.open('http://theprizeinside.com/policy.php', '_system'); _gaq.push(['_trackEvent', 'External', 'Policy', '']); return false;">Privacy Policy</a>
				</p>
			</div>
			
			
			
        </div>
        
        <div id="userlocation" class="popup">
			<a class="close" href="#"><span class="fa fa-times"> </span></a>
			<h1>Set Location</h1>
			<div id="locsearchbox">
				<p class="gpserror">No GPS location found.</p>
				<p class="locmessage">Enter an address to search:</p>
				<input id="loctext" value=""/>
				<a id="btnlocsearch" href="#" class="button" onclick="return false;">Search</a>
				<a id="btngpssearch" href="#" class="button fa fa-crosshairs" onclick="return false;"></a>
			</div>
			<img class="locationmap" src="" />
			<a class="location" href="#" onclick="return false;">Location: <span> </span></a>
		</div>
		
		<div id="locationoptions" class="messagebox">
			<a class="close" href="#"><span class="fa fa-times"></span></a>
			<img id="streetview" src=""/>
			<div class="clearfix"></div>
			<div class="vcard">
				<p class="fn"><p>
				<p class="adr">
				<span class="street-address"></span> <span class="city"></span>, <span class="region"></span> <span class="postal-code"></span>
				<br>
				<span class="country-name"></span>
				</p>
				<p class="tel"></p>
			</div>
			
			<a class="showdirections button"><span class="fa fa-road"></span>&nbsp;&nbsp;Driving Directions</a>
			<a class="showcheckin button"><span class="fa fa-thumbs-up"></span>&nbsp;&nbsp;Share</a>
			<a class="showwebsite button"><span class="fa fa-globe"></span>&nbsp;&nbsp;Website</a>
		</div>
		
		<div id="checkinpop" class="messagebox arrow_box">
			<p class="prizecomment"><?= (isset($checkin['checkinComment']))?$checkin['checkinComment']:'' ?></p>
			<img class="prizeimage" src="<?= (isset($checkin['checkinPhoto']))?$checkin['checkinPhoto']:'' ?>" />
			<h2 class="prizename"><?= (isset($checkin['prizeName']))?$checkin['prizeName']:'' ?></h2>
			<h3 class="restaurantname"><?= (isset($checkin['restaurantName']))?$checkin['restaurantName']:'' ?></h3>
			<!--<img class="locationmap" style="<?php if($checkin['checkinLat'] == 0 && $checkin['checkinLng']==0) echo "display:none;" ?>" src="http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=150x150&maptype=roadmap&markers=color:red%7Clabel:C%7C<?= (isset($checkin['checkinLat']))?$checkin['checkinLat']:'' ?>,<?= (isset($checkin['checkinLng']))?$checkin['checkinLng']:'' ?>&sensor=false" />-->
			<div class="profile">
				<img class="avatar" src="<?= (isset($checkin['profilePicture']))?$checkin['profilePicture']:'' ?>"/>
				<div style="float:left;">
					<h2 class="nickname"><?= (isset($checkin['profileNickname']))?$checkin['profileNickname']:'' ?></h2>
				</div>
			</div>	
		</div>
        
        <div id="footer">
        	<a href="#" onclick="window.open('policy.php', '_system'); _gaq.push(['_trackEvent', 'External', 'Privacy Policy', '']); return false;" class="policy">
				Privacy Policy
			</a>
        	<a href="#" onclick="window.open('http://www.greenzeta.com/home/listing/product', '_system'); _gaq.push(['_trackEvent', 'External', 'GreenZeta', '']); return false;" class="gz">
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
	    <script src="js/cCheckinPop.js"></script>
		
		<script type="text/javascript" src="js/util.js"></script>
        <script type="text/javascript" src="js/index_desktop.js"></script>
        
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
        	$(document).ready(function(){
        		AppInit();
				//AdInit();
				if($(window).width() > 900){
					WallMapInit();
				}else{
					//$('meta[name="viewport"]').attr('content', 'user-scalable=no, width=600');
				}
				
				$('.showapp').click(function(){
					panel['app'].Load();
				});
				
				$('.showinfo').click(function(){
					panel['info'].Load();
				});
				
				$('.showuserlocation').click(function(){
					panel['userlocation'].Load();
				});
				
				$( window ).resize(function() {
					if((!wallmap)&&($(window).width() > 900)) WallMapInit();
					
					// Resize home listing
					var offsetheight =  $('#home .header').height()+$('#home .name').height()+$('#footer').height()+(parseInt($('#home .name').css('padding-top'))*2);
    				if( $(window).width() > 900 ) offsetheight = $('#home .name').height()+(parseInt($('#home .name').css('padding-top'))*2);
    				$('#home .content').css('height',($('#home').height()-offsetheight)+"px");
					
					// Resize prize listing
					offsetheight =  $('#prize .header').height()+$('#prize .tabs').height()+$('#footer').height()+$('#prize .name').height()+(parseInt($('#prize .name').css('padding-top'))*2);
				    if( $(window).width() > 900 ) offsetheight =  $('#prize .tabs').height()+$('#prize .name').height()+(parseInt($('#prize .name').css('padding-top'))*2);
				    $('#prize .tabpanel').css('width',$('#prize').width()+"px");
				    $('#prize .tabpanel').css('height',($('#prize').height()-offsetheight)+"px");
					
				});
				
				<?= (isset($checkin))?"panel['checkindetail'].Show();":"" ?>
        	});
        </script>
    </body>
</html>
