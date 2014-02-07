<?php 

if(isset($_GET['ck'])){
	
	include('reactor/application/config/database.php');
	
	$conn = mysql_connect($db['default']['hostname'], $db['default']['username'], $db['default']['password']) 
  		or die("Unable to connect to MySQL");
		
	//select a database to work with
	$dbc = mysql_select_db($db['default']['database'],$conn) 
	  or die("Could not select examples");
	}
	
	$checkinRS = mysql_query("SELECT checkinLat,checkinLng,checkinComment,checkinPhoto,checkinTimeStamp,restaurantName,prizeName,profileNickname,profilePicture FROM tblCheckin INNER JOIN tblRestaurant ON tblCheckin.restaurantId=tblRestaurant.restaurantId INNER JOIN tblPrize ON tblCheckin.prizeId=tblPrize.prizeId INNER JOIN tblProfile ON tblCheckin.profileId=tblProfile.profileId WHERE checkinId=".$_GET['ck']);
	$checkin = mysql_fetch_assoc($checkinRS)
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title>The Prize Inside</title>
	<meta name="description" content="Choose your fast food by the prize inside.">
	<meta name="author" content="Matthew Wilber">
	<meta property="og:title" content="The Prize Inside" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="http://theprizeinside.com/policy.html" />
	<meta property="og:image" content="http://theprizeinside.com/img/fb_icon.png" />
	<meta property="og:site_name" content="The Prize Inside" />
	<meta property="fb:admins" content="631337813" />
	<meta property="og:description" content="Choose your fast food by the prize inside." />
	
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
	<link href='https://fonts.googleapis.com/css?family=Anton' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Coustard:400,900' rel='stylesheet' type='text/css'>
	<link type="text/css" href="css/jquery.jscrollpane.css" rel="stylesheet" media="all" />
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <link href="css/style.css" rel="stylesheet" media="screen">
    
    <link href="css/dev.css" rel="stylesheet" media="screen">

  </head>
  <body>
  	<?php if(isset($_GET['ck'])): ?>
  	<div id="checkin">
  		<div class="shade"></div>
  		<div class="page">
  			<h1>Checkin</h1>
  			<img class="profilepicture" src="<?=$checkin['profilePicture']?>"/>
  			<h2 class="nickname"><?=$checkin['profileNickname']?></h2>
  			<h1 class="prizename"><?=$checkin['prizeName']?></h1>
  			<p class="date"><?=date('F/j/Y',strtotime($checkin['checkinTimeStamp']))?></p>
  			<p class="comment"><?=$checkin['checkinComment']?></p>
  			<img class="photo" src="<?=$checkin['checkinPhoto']?>"/>
  			<h2 class="restaurant"><?=$checkin['restaurantName']?></h2>
  			<img class="map" src="http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=250x175&maptype=roadmap&markers=color:red%7Clabel:C%7C<?=$checkin['checkinLat']?>,<?=$checkin['checkinLng']?>&sensor=false"/>
  		</div>
  	</div>
  	<?php endif; ?>
  	<div id="header">
  		<img id="logo" src="img/logo.png"/>
  		<div id="title">The Prize Inside</div>
    	<div class="clearfix"></div>
  	</div>
 	<div id="content">
		
 	</div>
	<div id="footer">
    	<a id="gzlink" href="http://www.greenzeta.com" target="_blank">A GreenZeta Production</a>
   	</div>
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!-- the mousewheel plugin -->
	<script type="text/javascript" src="js/jquery.mousewheel.js"></script>
	<!-- the jScrollPane script -->
	<script type="text/javascript" src="js/jquery.jscrollpane.min.js"></script>
    <script src="js/fb.js"></script>
    <script src="js/script.js"></script>
    
    
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