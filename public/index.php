<!DOCTYPE html>
<!--
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="format-detection" content="telephone=no" />
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
			<a class="showuserlocation fa fa-location-arrow" target="_blank"> </a>
			<a class="showinfo fa fa-info-circle" target="_blank"> </a>
        </div>
        
        <div id="wallmap">google map here</div>

        <div id="container">
 
			<div id="home" class="panel">
				<h1 class="name">The Prize Inside</h1>
				<div class="header">
					<img id="homeview" src="img/homebanner.jpg"/>
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
        
        <div id="info" class="popup">
			<a class="close" href="#"><span class="fa fa-times"></span></a>
			<h1>About</h1>
			<div id="aboutbox" class="scroll-pane">
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rhoncus mollis quam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed vel pellentesque nulla. Integer ac ullamcorper mi. Mauris non elit egestas, rhoncus nisi in, auctor ligula. Integer ante lectus, luctus vitae sem a, tempus pellentesque dolor. Fusce sed orci ornare, sodales orci vitae, viverra quam. Praesent a placerat tellus, ut convallis diam.</p>
				<p>Donec tempor felis nec congue molestie. Nullam condimentum ac sem ut venenatis. Proin accumsan accumsan odio at fermentum. Quisque placerat, erat non pulvinar blandit, ante eros dapibus turpis, vitae fringilla nisi diam eu libero. Maecenas iaculis massa eu eros euismod, quis gravida augue consequat. Maecenas ornare erat id neque auctor, vitae luctus lorem aliquet. Quisque viverra hendrerit aliquet. Maecenas vestibulum ipsum ac vestibulum porttitor. Morbi sollicitudin sagittis erat vel sagittis. Fusce fermentum, nisl nec adipiscing ultricies, massa est sagittis elit, quis aliquam odio nisi sit amet quam.</p>
			</div>
		</div>
        
        <div id="checkindetail" class="popup">
			<a class="close" href="#"><span class="fa fa-times"></span></a>
			<h1>Prize</h1>
			<p class="prizecomment"></p>
			<img class="prizeimage" src="" />
			<h2 class="prizename"></h2>
			<h3 class="restaurantname"></h3>
			<img class="locationmap" src="" />
			<div class="profile">
				<img class="avatar" src=""/>
				<div style="float:left;">
					<h2 class="nickname"></h2>
					<div class="checkincount">
						<span class="number">&nbsp;</span> Prizes
					</div>
				</div>
			</div>
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
	    <script src="js/cLocationOptions.js"></script>
		
		<script type="text/javascript" src="js/util.js"></script>
        <script type="text/javascript" src="js/index_desktop.js"></script>
        <script type="text/javascript">
        	$(document).ready(function(){
        		AppInit();
				//AdInit();
				if($(window).width() > 600) WallMapInit();
				
				$('.showinfo').click(function(){
					panel['info'].Load();
				});
				
				$('.showuserlocation').click(function(){
					panel['userlocation'].Load();
				});
        	});
        </script>
    </body>
</html>
