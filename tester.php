<?php 

	include('./php/simple_html_dom.php');
	
	$bkUrl = "http://subwaykids.com/grownups/promotions/kidsmeals.aspx";
	$bkObj = file_get_html($bkUrl);

?>

<?php foreach($bkObj->find('.modal3 img') as $e): ?>
	<img src="<?php echo "http://subwaykids.com".$e->src ?>" width="300"/>
	<br/>
<?php endforeach; ?>