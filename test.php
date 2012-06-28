<?php

	define('MCDONALDS_ROOT', 'http://www.happymeal.com/en_US');
	define('BURGERKING_ROOT', 'http://www.bkcrown.com/toys');
	define('TACOBELL_ROOT', 'http://www.tacobell.com');
	define('SONIC_ROOT', 'http://www.sonicdrivein.com/kids');
	


	//$xmlUrl = MCDONALDS_ROOT."/config/flash.xml"; // XML feed file/URL
	$xmlUrl = "./data/happymeal.xml"; // XML feed file/URL
	$xmlStr = file_get_contents($xmlUrl);
	$xmlStr = str_replace('&', '&amp;', $xmlStr);
	$xmlStr = str_replace('e->', 'e-->', $xmlStr);
	$xmlObj = simplexml_load_string($xmlStr);
	
	include('./php/simple_html_dom.php');
	
	$bkUrl = BURGERKING_ROOT."/Default.aspx";
	$bkObj = file_get_html($bkUrl);
	
	$tbUrl = TACOBELL_ROOT."/food/menu/kids-meals/";
	$tbObj = file_get_html($tbUrl);
	
	$scUrl = SONIC_ROOT."/wackyPackToys.jsp";
	$scObj = file_get_html($scUrl);
	
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

	<link rel="stylesheet" href="css/style.css">

	<script src="js/libs/modernizr-2.5.3-respond-1.1.0.min.js"></script>
</head>
<body>
<!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

<header>

</header>
<div role="main">
	<h1>McDonalds</h1>
	<?php foreach ($xmlObj->sections->section as $item): ?>
		<?php if( $item->id == "Toys" ): ?>
			<?php foreach ($item->files->file as $xfile): ?>
				<?php if( $xfile->id == "Toys" ): ?>
					<?php foreach ($xfile->properties->tabs->tab as $xtab): ?>
						<?php if( $xtab['name'] == "AllToys" ): ?>
							<?php foreach ($xtab->asset as $xasset): ?>
									<img src="<?php echo MCDONALDS_ROOT."/".$xasset->fileContent->splash->url ?>" width="300"/>
									<br/>
							<?php endforeach; ?>
						<?php endif; ?>
					<?php endforeach; ?>
				<?php endif; ?>
			<?php endforeach; ?>
		<?php endif; ?>
	<?php endforeach; ?>
	
	<h1>Burger King</h1>
	<?php foreach($bkObj->find('#scroller2 div.toyScroller div.items div.item img') as $e): ?>
		<img src="<?php echo BURGERKING_ROOT."/".$e->src ?>" width="300"/>
		<br/>
	<?php endforeach; ?>
	
	<h1>Taco Bell</h1>
	<?php foreach($tbObj->find('#itemMenu ul li img') as $e): ?>
		<img src="<?php echo TACOBELL_ROOT."/".$e->src ?>" width="300"/>
		<br/>
	<?php endforeach; ?>
	
	<h1>Sonic Drive-In</h1>
	<?php foreach($scObj->find('div.bodycontent img') as $e): ?>
		<img src="<?php echo SONIC_ROOT."/".$e->src ?>" width="300"/>
		<br/>
	<?php endforeach; ?>
</div>
<footer>

</footer>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.2.min.js"><\/script>')</script>

<script src="js/plugins.js"></script>
<script src="js/script.js"></script>
<script>
	var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
	(function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
	g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
	s.parentNode.insertBefore(g,s)}(document,'script'));
</script>

</body>
</html>
