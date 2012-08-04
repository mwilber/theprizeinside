<a name="<?=$restaurant->restaurantAlias?>"></a> 
<div class="flexslider">
	<h2><?=$restaurant->restaurantTitle?></h2>
	<div class="btn-group sharegroup">
		<a class="btn btn-large dropdown-toggle" data-toggle="dropdown" href="#">
			<i class="icon-comment"></i>
			<span class="caret"></span>
		</a>
		<ul class="dropdown-menu">
	    	<li><a class="facebook" href="#" onclick="fbshare('<?=$restaurant->restaurantTitle?>'); return false;"><!--<img src="images/btn_fb.png" alt="facebook"/>-->Facebook</a></li>
			<li><a class="googleplus" href="#" onclick="gpshare('<?=$restaurant->restaurantTitle?>'); return false;"><!--<img src="images/btn_gp.png" alt="google plus"/>-->Google +</a></li>
			<li><a class="tweeters" href="#" onclick="twshare('<?=$restaurant->restaurantTitle?>'); return false;"><!--<img src="images/btn_tw.png" alt="Tweeters"/>-->Twitter</a></li>
		</ul>
	</div>
	<div class="extlink"><a href="<?php echo $restaurant->restaurantDataUrl; ?>" class="btn btn-large" target="_blank"><i class="icon-share"></i></a></div>
  <div class="locations"><a href="#" class="btn btn-large" onclick="GetDistance('<?=$restaurant->restaurantTitle?>', '<?=$restaurant->restaurantAlias?>'); return false;">Get locations</a></div>
  <div class="clearfix"></div>
  <ul class="slides">
  	<?php if( count($images) < 1 ): ?>
  		<li>
    		<img src="images/no_prize.jpg" width="270" height="270" />
    	</li>
  	<?php else: ?>
  	<?php foreach($images as $rimg): ?>
  		<li>
    		<img src="<?= $rimg->imageAmazon ?>" width="270" height="270" />
    	</li>
  	<?php endforeach; ?>
  	<?php endif; ?>
  </ul>
</div>