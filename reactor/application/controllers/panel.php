<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Panel extends CI_Controller
{
	var $requiredfield = "imageUrl";
	
    // Retrieve
	function index($pAlias="html")
	{
		$this->load->model('restaurant_model');
		$this->load->model('image_model');
	    
		$data['restaurants'] = $this->restaurant_model->Get(array('restaurantAlias' => $pAlias));
		if( count( $data['restaurants']) > 0 ){
			$data['restaurant'] = $data['restaurants'][0];
			$data['images'] = $this->image_model->Get(array('restaurantId'=>$data['restaurant']->restaurantId,'imageActive'=>1));
			$this->load->view($this->uri->segment(1).'/'.$this->uri->segment(1).'_index', $data);
		}

	}
	

}