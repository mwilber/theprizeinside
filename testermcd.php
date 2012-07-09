<?php 

	define('UPLOAD_DIR','./reactor/uploads/');

	$restaurant = new stdClass;
	$restaurant->restaurantAlias = "mcd";
	$restaurant->restaurantBaseUrl = "http://m.happymeal.com/";

	include('./reactor/application/helpers/simple_html_dom_helper.php');
	
	$bkUrl = "http://m.happymeal.com/pages/toys-1.html";
	//$bkObj = file_get_html($bkUrl);
	
	$useragent= "Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10')";

    $ch = curl_init ($bkUrl);

    curl_setopt ($ch, CURLOPT_USERAGENT, $useragent); // set user agent
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
    $output = curl_exec ($ch);

    
	
	$bkObj = str_get_html($output);

?>

<?php foreach($bkObj->find('#toyspictures img') as $e): 
	
	$tmpImageUrl = $restaurant->restaurantBaseUrl."/".ltrim($e->src, "./");
	
	$file_ext = substr(strrchr($tmpImageUrl, '.'), 1);
	$target_name = $restaurant->restaurantAlias.'_'.date("U").'.'.$file_ext;
	
	$ch = curl_init ($tmpImageUrl);

    curl_setopt ($ch, CURLOPT_USERAGENT, $useragent); // set user agent
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER,1);
    // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, TRUE);
   $output = curl_exec ($ch);
	
	file_put_contents(UPLOAD_DIR.$target_name, $output);	
	//$fp = fopen(UPLOAD_DIR.$target_name,'x');
    //fwrite($fp, $output);
	
?>
	<img src="<?php echo UPLOAD_DIR.$e->src ?>" width="300"/>
	<br/>
<?php endforeach; curl_close($ch); ?>