<?php

	$social = array();
	$social['title'] = "The Prize Inside";
	$social['description'] = "What's in the kid's meal at your fast food restaurants.";
	$social['image'] = "http://theprizeinside.com/images/fb_icon.png";
	$social['link'] = "http://theprizeinside.com/";

?>
<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
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

	<meta name="viewport" content="width=device-width">
	<meta name="apple-mobile-web-app-capable" content="yes">

	<link rel="stylesheet" href="css/bootstrap.min.css">
	<style>
	body {
	  padding-top: 60px;
	  padding-bottom: 40px;
	}
	</style>
	<link rel="stylesheet" href="css/bootstrap-responsive.min.css">
	<link rel='stylesheet' id='camera-css'  href='css/flexslider.css' type='text/css' media='all'>
	<link rel="stylesheet" href="css/style.css">

	<script type="text/javascript" src="js/config.js"></script>
	<script type="text/javascript">
		var social = [];
		social['title'] = "<?=$social['title']?>";
		social['description'] = "<?=$social['description']?>";
		social['image'] = "<?=$social['image']?>";
		social['link'] = "<?=$social['link']?>";
	</script>
	<script src="js/libs/modernizr-2.5.3-respond-1.1.0.min.js"></script>
</head>
<body>
    <div class="navbar navbar-fixed-top">
      <div class="navbar-inner">
        <div class="container">
          <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
          <div class="nav-collapse">
            <ul class="nav">
              <li><a href="#">Home</a></li>
              <li><a href="#mcd">McDonalds</a></li>
              <li><a href="#bk">Burger King</a></li>
              <li><a href="#bel">Taco Bell</a></li>
              <li><a href="#snc">Sonic Drive-In</a></li>
              <li><a href="#sub">Subway</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">

      <!-- Main hero unit for a primary marketing message or call to action -->
      <div class="hero-unit">
      	<div id="likegroup">
      		<div class="fb-like" data-href="<?=$social['link']?>" data-send="false" data-layout="button_count" data-width="90" data-show-faces="false"></div>
			<g:plusone size="medium" href="<?=$social['link']?>"></g:plusone>
			<a href="https://twitter.com/share" class="twitter-share-button" data-url="<?=$social['link']?>" data-text="<?=$social['title']?> - <?=$social['description']?>" data-hashtags="fastfood">Tweet</a>
      	</div>
      	<img id="mascot" src="images/mascot_lg.png"/>
        <h1><span id="wordone">The</span><span id="wordtwo">Prize</span><br/><span id="wordthree">Inside</span></h1>
        <p>What&rsquo;s in the kid&rsquo;s meal at your fast food restaurants.</p>
        <div style="clear:both;"></div>
      </div>
      <!-- Example row of columns -->
      <div class="row" id="listing">
      	<div id="mcd" class="span6">
      		
      	</div>
      	<div id="bk" class="span6">
      		
      	</div>
	  </div>
	  <div class="row">
      	<div id="bel" class="span6">
      		
      	</div>
      	<div id="snc" class="span6">
      		
      	</div>
	  </div>
	  <div class="row">
      	<div id="sub" class="span6">
      		
      	</div>
      	<div id="" class="span6">
      		
      	</div>
	  </div>

      <footer>
        <a id="addtopage" href="#" onclick="AddToPage(); return false;">Add To Your Facebook Page</a>
  		<a id="gzlink" href="http://www.greenzeta.com" target="_blank">A GreenZeta Production</a>
      </footer>
	  <div id="fb-root"></div>
    </div> <!-- /container -->
    
<script type="text/javascript" src="https://connect.facebook.net/en_US/all.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>')</script>

<!-- scripts concatenated and minified via ant build script-->
<script src="js/libs/bootstrap/bootstrap.min.js"></script>
<script src="js/libs/jquery.easing.1.3.js"></script>
<script src="js/libs/jquery.mobile.customized.min.js"></script>
<script src="js/libs/jquery.flexslider-min.js"></script>

<script src="js/fb.js"></script>
<script src="js/script.js"></script>
<!-- end scripts-->

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
