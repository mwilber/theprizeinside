<?php 

	include('./reactor/application/helpers/simple_html_dom_helper.php');
	
	$bkUrl = "http://www.arbys.com/kids.html";
	$bkObj = file_get_html($bkUrl);

?>

<?php foreach($bkObj->find('#hey-kids-info img') as $e): ?>
	<img src="<?php echo "http://www.arbys.com".$e->src ?>" width="300"/>
	<br/>
<?php endforeach; ?>