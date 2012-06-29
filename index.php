<?php include('./php/simple_html_dom.php'); ?>

<?php 

	$restaurants = array();
	
	$restaurants['mcd'] = array(
			'title' => "McDonalds"
			,'base_url' => "http://www.happymeal.com/en_US"
			,'data_url' => "http://www.happymeal.com/en_US/config/flash.xml"
			,'images' => array()
			);
	$restaurants['bk'] = array(
			'title' => "Burger King"
			,'base_url' => "http://www.bkcrown.com/toys"
			,'data_url' => "http://www.bkcrown.com/toys/Default.aspx"
			,'images' => array()
			);
	$restaurants['bel'] = array(
			'title' => "Taco Bell"
			,'base_url' => "http://www.tacobell.com"
			,'data_url' => "http://www.tacobell.com/food/menu/kids-meals/"
			,'images' => array()
			);
	$restaurants['snc'] = array(
			'title' => "Sonic Drive-In"
			,'base_url' => "http://www.sonicdrivein.com/kids"
			,'data_url' => "http://www.sonicdrivein.com/kids/wackyPackToys.jsp"
			,'images' => array()
			);

?>

<?php

	foreach($restaurants as $key=>$restaurant){
		switch($key){
			case "mcd":
				$xmlStr = file_get_contents($restaurant['data_url']);
				$xmlStr = str_replace('&', '&amp;', $xmlStr);
				$xmlStr = str_replace('e->', 'e-->', $xmlStr);
				$xmlObj = simplexml_load_string($xmlStr);
				foreach ($xmlObj->sections->section as $item){
					if( $item->id == "Toys" ){
						foreach ($item->files->file as $xfile){
							if( $xfile->id == "Toys" ){
								foreach ($xfile->properties->tabs->tab as $xtab){
									if( $xtab['name'] == "AllToys" ){
										foreach ($xtab->asset as $xasset){
											//echo "LINK: ".$xasset->fileContent->splash->url;
											array_push($restaurants[$key]['images'], $restaurant['base_url']."/".$xasset->fileContent->splash->url);
										}/*endforeach*/
									}/*endif*/
								}/*endforeach*/
							}/*endif*/
						}/*endforeach*/
					}/*endif*/
				}
				break;
			case "bk":
				$xmlObj = file_get_html($restaurant['data_url']);
				foreach($xmlObj->find('#scroller2 div.toyScroller div.items div.item img') as $e){
					array_push($restaurants[$key]['images'], $restaurant['base_url']."/".$e->src );
				}
				break;
			case "bel":
				$xmlObj = file_get_html($restaurant['data_url']);
				foreach($xmlObj->find('#itemMenu ul li img') as $e){
					array_push($restaurants[$key]['images'], $restaurant['base_url']."/".$e->src );
				}
				break;
			case "snc":
				$xmlObj = file_get_html($restaurant['data_url']);
				foreach($xmlObj->find('div.bodycontent img') as $e){
					array_push($restaurants[$key]['images'], $restaurant['base_url']."/".$e->src );
				}
				break;
		}
	}
	
	//print_r($restaurants);

?>

<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title></title>
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width">

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
          <a class="brand" href="#">The Prize Inside</a>
          <div class="nav-collapse">
            <ul class="nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div><!--/.nav-collapse -->
        </div>
      </div>
    </div>

    <div class="container">

      <!-- Main hero unit for a primary marketing message or call to action -->
      <div class="hero-unit">
        <h1>Hello, world!</h1>
        <p>This is a template for a simple marketing or informational website. It includes a large callout called the hero unit and three supporting pieces of content. Use it as a starting point to create something more unique.</p>
        <p><a class="btn btn-primary btn-large">Learn more &raquo;</a></p>
      </div>

      <!-- Example row of columns -->
      <div class="row">
      <?php $idx=0; foreach($restaurants as $key=>$restaurant): ?>
	        <div class="flexslider span4">
	          <h2><?=$restaurant['title']?></h2>
	          <ul class="slides">
	          	<?php foreach($restaurant['images'] as $rimg): ?>
	          		<div data-src="<?= $rimg ?>"></div>
	          		<li>
			    		<img src="<?= $rimg ?>" />
			    	</li>
	          	<?php endforeach; ?>
	          </ul>
	        </div>
	      <?php if($idx != 0 && ($idx+1) % 3 == 0): ?>
	      </div><div class="row">
	      <?php endif; ?>
      <?php $idx++; endforeach; ?>
	  </div>
      <hr>

      <footer>
        <p>&copy; Company 2012</p>
      </footer>

    </div> <!-- /container -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>')</script>

<!-- scripts concatenated and minified via ant build script-->
<script src="js/libs/bootstrap/bootstrap.min.js"></script>
<script src="js/libs/jquery.easing.1.3.js"></script>
<script src="js/libs/jquery.mobile.customized.min.js"></script>
<script src="js/libs/jquery.flexslider-min.js"></script>

<script src="js/script.js"></script>
<!-- end scripts-->

<script>
	var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
	g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
</script>

</body>
</html>
