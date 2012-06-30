<a name="<?=$restaurant->restaurantAlias?>"></a> 
<div class="flexslider">
  <h2><?=$restaurant->restaurantTitle?></h2>
  <ul class="slides">
  	<?php foreach($images as $rimg): ?>
  		<li>
    		<img src="<?= $rimg->imageUrl ?>" />
    	</li>
  	<?php endforeach; ?>
  </ul>
</div>