<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class SrvList extends CI_Controller {


	public function index()
	{
		
	}
	
	public function getnames()
	{
		$response = new stdClass();
		
		$this->load->model('restaurant_model');
		$this->load->model('prize_model');
		$data = $this->restaurant_model->Get();
		
		foreach ($data as $restaurant) {
			$restaurant->prize = $this->prize_model->Get(array('restaurantId'=>$restaurant->restaurantId,'prizeActive'=>1));
		}
		
		header('Content-type: application/json');
		echo json_encode($data);
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */