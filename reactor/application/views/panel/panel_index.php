<a name="<?=$restaurant->restaurantAlias?>"></a> 
<div class="flexslider">
  <h2><?=$restaurant->restaurantTitle?></h2>
  <div class="sharegroup">
	<a class="facebook" href="#" onclick="fbshare(); return false;"><img src="images/btn_fb.png" alt="facebook"/></a>
	<a class="googleplus" href="#" onclick="gpshare(); return false;"><img src="images/btn_gp.png" alt="google plus"/></a>
	<a class="tweeters" href="#" onclick="twshare(); return false;"><img src="images/btn_tw.png" alt="Tweeters"/></a>
	<!--<a id="info" href="#" onclick="return false;"><img src="images/btn_info.png" alt="info"/></a>-->
  </div>
  <div class="clearfix"></div>
  <ul class="slides">
  	<?php foreach($images as $rimg): ?>
  		<li>
    		<img src="<?= $rimg->imageUrl ?>" />
    	</li>
  	<?php endforeach; ?>
  </ul>
</div>