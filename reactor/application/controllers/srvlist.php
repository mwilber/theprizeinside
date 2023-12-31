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

		//header('Access-Control-Allow-Origin: *');
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
			$prize->checkins = $this->checkin_model->Get(array('prizeId'=>$prize->prizeId, 'limit'=>10, 'sortBy'=>'checkinTimeStamp','sortDirection'=>'DESC'));
		}

		//header('Access-Control-Allow-Origin: *');
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

		//header('Access-Control-Allow-Origin: *');
		header('Content-type: application/json');
		echo json_encode($result);
	}

	public function getcheckinsbyuser($pId = 0){
		$result = new stdClass();
		$result->status = 0;

		if( $pId > 0 ){
			$this->load->model('checkin_model');
			$result->checkins = $this->checkin_model->Get(array('profileId'=>$pId,'sortBy'=>'checkinTimeStamp','sortDirection'=>'DESC'));
		}

		// Sanetize anonymous postings
		foreach($result->checkins as $checkin){
			unset($checkin->profileId);
			if( $checkin->checkinAnonymous == 1 ){
				$checkin->checkinLocation = "";
				$checkin->checkinLat = "";
				$checkin->checkinLng = "";
			}
		}

		//header('Access-Control-Allow-Origin: *');
		header('Content-type: application/json');
		echo json_encode($result);
	}

	public function getcheckinsbyprize($pId = 0){
		$result = new stdClass();
		$result->status = 0;

		if( $pId > 0 ){
			$this->load->model('checkin_model');
			$result->checkins = $this->checkin_model->Get(array('prizeId'=>$pId,'sortBy'=>'checkinTimeStamp','sortDirection'=>'DESC'));
		}

		// Sanetize anonymous postings
		foreach($result->checkins as $checkin){
			unset($checkin->profileId);
			if( $checkin->checkinAnonymous == 1 ){
				$checkin->checkinLocation = "";
				$checkin->checkinLat = "";
				$checkin->checkinLng = "";
			}
		}

		//header('Access-Control-Allow-Origin: *');
		header('Content-type: application/json');
		echo json_encode($result);
	}

	public function getcheckinsbyrecent(){
		$result = new stdClass();
		$result->status = 0;

		$this->load->model('checkin_model');
		$tmpCheckin = $this->checkin_model->Get(array('checkinAnonymous'=>0,'limit'=>10,'offset'=>0,'sortBy'=>'checkinTimeStamp','sortDirection'=>'DESC'));
		$result->checkins = array();

		// Sanetize anonymous postings
		foreach($tmpCheckin as $checkin){
			unset($checkin->profileId);
			if( $checkin->checkinAnonymous == 1 ){
				$checkin->checkinLocation = "";
				$checkin->checkinLat = "";
				$checkin->checkinLng = "";
			}
			if( $checkin->checkinLat != 0 && $checkin->checkinLng != 0 )
			$result->checkins[] = $checkin;
		}

		//header('Access-Control-Allow-Origin: *');
		header('Content-type: application/json');
		echo json_encode($result);
	}

	public function getcheckindetail($pId = 0){

		$result = new stdClass();
		$result->status = 0;

		$this->load->model('checkin_model');
		$this->load->model('prize_model');
		$this->load->model('restaurant_model');
		$this->load->model('profile_model');
		$this->load->helper('idobfuscator');

		$result->checkin = $this->checkin_model->Get(array($this->checkin_model->_pk()=>$pId));
		$result->prize = $this->prize_model->Get(array($this->prize_model->_pk()=>$result->checkin->prizeId));
		$result->restaurant = $this->restaurant_model->Get(array($this->restaurant_model->_pk()=>$result->checkin->restaurantId));
		$result->profile = $this->profile_model->Get(array($this->profile_model->_pk()=>$result->checkin->profileId));
		$result->profile->count = $this->checkin_model->Get(array('profileId'=>$result->profile->profileId,'count' => true));

		$result->checkin->checkinToken = $_GET['ck'] = IdObfuscator::encode($result->checkin->checkinId);

		unset($result->profile->profileId);
		unset($result->checkin->profileId);

		// Sanetize anonymous postings
		if( $result->checkin->checkinAnonymous == 1 ){
			$result->checkin->checkinLocation = "";
			$result->checkin->checkinLat = "";
			$result->checkin->checkinLng = "";
		}
		if( $result->checkin->checkinAnonymous == 1 ){
			$result->profile->profileFullname = "";
		}

		//header('Access-Control-Allow-Origin: *');
		header('Content-type: application/json');
		echo json_encode($result);
	}

}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
