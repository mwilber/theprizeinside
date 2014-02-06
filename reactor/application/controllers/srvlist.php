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
		$this->load->model('checkin_model');
		$data = $this->restaurant_model->Get();
		
		foreach ($data as $restaurant) {
			$restaurant->prize = $this->prize_model->Get(array('restaurantId'=>$restaurant->restaurantId,'prizeActive'=>1));
			$restaurant->checkins = array();
			$idx = 0;
			//print_r($restaurant->prize);
			foreach ($restaurant->prize as $prize) {
				$restaurant->checkins[$idx] = $this->checkin_model->Get(array('prizeId'=>$prize->prizeId, 'limit'=>10));
				$idx++;
			}
		}
		
		header('Content-type: application/json');
		echo json_encode($data);
	}
	
	public function getprizes()
	{
		$response = new stdClass();
		
		$this->load->model('restaurant_model');
		$this->load->model('prize_model');
		$this->load->model('checkin_model');
		$data = $this->prize_model->Get(array('prizeActive'=>1,'sortBy'=>'prizeTimeStamp','sortDirection'=>'DESC'));
		
		foreach ($data as $prize) {
			$prize->restaurant = $this->restaurant_model->Get(array('restaurantId'=>$prize->restaurantId));
			$prize->checkins = $this->checkin_model->Get(array('prizeId'=>$prize->prizeId, 'limit'=>10));
		}
		
		header('Content-type: application/json');
		echo json_encode($data);
	}
	
	public function getprofile($pId = 0)
	{
		$result = new stdClass();
		$result->status = 0;
		
		if( $pId > 0 ){
			$this->load->model('profile_model'); 
			$result->profile = $this->profile_model->Get(array('profileId'=>$pId));
			if( isset($result->profile->profileId) ){
				$this->load->model('auth_model');
				$result->profile->auth = $this->auth_model->GetClean(array('profileId'=>$result->profile->profileId));
				
			}
		}
		
		header('Content-type: application/json');
		echo json_encode($result);
	}
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */