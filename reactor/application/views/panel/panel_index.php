<a name="<?=$restaurant->restaurantAlias?>"></a> 
<div class="flexslider">
  <h2><?=$restaurant->restaurantTitle?></h2>
  <div class="sharegroup">
	<a class="facebook" href="#" onclick="fbshare('<?=$restaurant->restaurantTitle?>'); return false;"><img src="images/btn_fb.png" alt="facebook"/></a>
	<a class="googleplus" href="#" onclick="gpshare('<?=$restaurant->restaurantTitle?>'); return false;"><img src="images/btn_gp.png" alt="google plus"/></a>
	<a class="tweeters" href="#" onclick="twshare('<?=$restaurant->restaurantTitle?>'); return false;"><img src="images/btn_tw.png" alt="Tweeters"/></a>
	<!--<a id="info" href="#" onclick="return false;"><img src="images/btn_info.png" alt="info"/></a>-->
  </div>
  <div class="locations"><a href="#" onclick="GetDistance('<?=$restaurant->restaurantTitle?>', '<?=$restaurant->restaurantAlias?>'); return false;">Get locations</a></div>
  <div class="clearfix"></div>
  <ul class="slides">
  	<?php foreach($images as $rimg): ?>
  		<li>
    		<img src="<?= $rimg->imageAmazon ?>" />
    	</li>
  	<?php endforeach; ?>
  </ul>
</div>