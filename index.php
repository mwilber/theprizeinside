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
	<meta property="og:url" content="http://theprizeinside.com/" />
	<meta property="og:image" content="http://theprizeinside.com/img/fb_icon.png" />
	<meta property="og:site_name" content="The Prize Inside" />
	<meta property="fb:admins" content="631337813" />
	<meta property="og:description" content="Choose your fast food by the prize inside." />

	<meta name="viewport" content="width=device-width">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<link rel="apple-touch-startup-image" href="/startup.png">
	<link href='http://fonts.googleapis.com/css?family=Vollkorn:400,700' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Ultra' rel='stylesheet' type='text/css'>
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
		var isMobile = false;
		
		$(document).ready(function(){
			
			//if( !isMobile ){
				FB.init({appId: FBconfig.app.id, status : true, cookie: true, xfbml : true});
				SetFrame();
			//}
			
			InitMap();
			QueryLocation();
			
		});
	</script>

  </head>
  <body>
  	<div id="loader">
  		<div class="progress progress-warning">
		  <div class="bar" style="width: 0%;"></div>
		</div>
  	</div>
  	<div id="header">
  		<img id="logo" src="img/logo.png"/>
  		<div id="title">The Prize Inside</div>
  		<div id="likegroup">
      		<div class="fb-like" data-href="http://theprizeinside.com/" data-send="false" data-layout="button_count" data-width="90" data-show-faces="false"></div>
			<g:plusone size="medium" href="http://theprizeinside.com/"></g:plusone>
			<a href="https://twitter.com/share" class="twitter-share-button" data-url="http://theprizeinside.com/" data-text="The Prize Inside - Choose your fast food by the prize inside." data-hashtags="fastfood">Tweet</a>
    	</div>
    	<div class="clearfix"></div>
  	</div>
	<div id="overmap"></div>
	<div id="geoModal" class="modal hide fade">
	  <div class="modal-header">
	    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
	    <h3>Could Not Determine Your Location</h3>
	  </div>
	  <div class="modal-body">
	    <p>The Prize Inside uses your location to display nearby fast food restaurants. You may continue to use the site however, for the optimal experience, you should use a browser that is location aware and grant The Prize Inside permission to your location. Location information provided to The Prize Inside is used directly in your browser and not stored in any form.</p>
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
   	</div>
    <div id="fb-root"></div>
	<div id="map"></div>
    
    <script type="text/javascript" src="https://connect.facebook.net/en_US/all.js"></script>
    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?libraries=places&sensor=true"></script>
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="js/bootstrap.min.js"></script>
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