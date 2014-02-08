<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Oauth extends CI_Controller {

	public function index(){
        //redirect('oauth/login');
        $ci_config = $this->config->item('opauth_config');
        $arr_strategies = array_keys($ci_config['Strategy']);
        
        echo("Please, select an Oauth provider:<br />");
        echo("<ul>");
        foreach($arr_strategies AS $strategy){
            echo("<li><a href='".base_url()."oauth/login/".strtolower($strategy)."'>Login with ".$strategy."</li>");
        }
        echo("</ul>");
	}
    
    public function login($pStrategy="",$pId=0){
        //Comprobate if the user request a strategy
        if($pId != 0){
        	$this->session->set_userdata('profileId',$pId);
        }
        if($this->uri->segment(3)!=''){
            //Run login
            $this->load->library('Opauth/Opauth', $this->config->item('opauth_config'), false);
            $this->opauth->run();    
        }     
    }
    
    function authenticate(){
        //Create authenticate logic
        $this->load->model('auth_model'); 
        $this->load->model('profile_model'); 
        
        $arrAuth = array();
        $arrAuth['authService'] = "";
        $arrAuth['authServiceId'] = "";
        $arrAuth['authToken'] = "";
		$arrAuth['authSecret'] = "";
        $arrAuth['profileId'] = "";
        
        $arrProfile = array();
        $arrProfile['profileNickname'] = "";
        $arrProfile['profileFullname'] = "";
        $arrProfile['profilePicture'] = "";
        
        $response = unserialize(base64_decode( $_POST['opauth'] ));
		
		// Output for testing
        /*echo ($response['auth']['provider']);
        echo ("<br/>");
        echo ($response['auth']['uid']);
        echo ("<br/>");
        echo ($response['auth']['info']['name']);
        echo ("<br/>");
        echo ($response['auth']['info']['image']);
        echo ("<br/>");
        echo ($response['auth']['info']['nickname']);
        echo("<pre>");
        print_r($response);
        echo("</pre>");*/
        
		// TODO: Handle erroros from auth response
		
        $arrAuth['authService'] = $response['auth']['provider'];
        $arrAuth['authServiceId'] = $response['auth']['uid'];
        $arrAuth['authToken'] = $response['auth']['credentials']['token'];
		if( isset($response['auth']['credentials']['secret']) )
			$arrAuth['authSecret'] = $response['auth']['credentials']['secret'];
        
        $arrProfile['profileNickname'] = $response['auth']['info']['nickname'];
        $arrProfile['profileFullname'] = $response['auth']['info']['name'];
        $arrProfile['profilePicture'] = $response['auth']['info']['image'];
        
        if( $arrAuth['authServiceId'] != "" ){
        	// Look for an existing auth record
        	$rsAuth = $this->auth_model->Get(array('authServiceId'=>$arrAuth['authServiceId']));
			
			// For users that logged in under another service already. 
			// Make sure the auth isn't attached to another profile.
			if( count($rsAuth) > 0 ){
				if( $rsAuth[0]->profileId != $this->session->userdata('profileId') ){
					$this->auth_model->Update(array('authId'=>$rsAuth[0]->authId, 'profileId'=>$this->session->userdata('profileId')));
					$rsAuth = $this->auth_model->Get(array('authServiceId'=>$arrAuth['authServiceId']));
				}
			}
			
        	if( count($rsAuth) > 0 ){
        		// Redirect to profile
        		redirect('oauth/profile/'.$rsAuth[0]->profileId);
        	}else{
        		if( $this->session->userdata('profileId') ){
        			$profileId = $this->session->userdata('profileId');
        		}else{
        			// Make a new profile 
        			$profileId = $this->profile_model->Add($arrProfile);
        		}
        		
				// Attach the auth record
				$arrAuth['profileId'] = $profileId;
				$authId = $this->auth_model->Add($arrAuth);
				echo "new profile created";
				$rsAuth = $this->auth_model->Get(array('authServiceId'=>$arrAuth['authServiceId']));
				if( count($rsAuth) > 0 ){
	        		// Redirect to profile
	        		redirect('oauth/profile/'.$rsAuth[0]->profileId);
	        	}else{
	        		// TODO: Handle error on auth record add
				}
        	}
        }
    }

	public function profile($pId = 0){
		
		$result = new stdClass();
		$result->status = 0;
		
		if( $pId > 0 ){
			$this->load->model('profile_model'); 
			$result->profile = $this->profile_model->Get(array('profileId'=>$pId));
			if( isset($result->profile->profileId) ){
				$this->load->model('auth_model');
				$result->profile->auth = $this->auth_model->Get(array('profileId'=>$result->profile->profileId));
			}
		}
		
		//header('Content-type: application/json');
		//echo json_encode($result);
		
		if( $this->session->userdata('profileId') == $pId ){
			$this->load->view('oauth/oauth_profile');
		}else{
			$this->load->view('oauth/oauth_userlogin');
		}
	}

	public function twpost(){
		// Set tmhOAuth config object
		$tmhOAuthConfig = array(
		  'consumer_key'    => 'G21e48OkiD1A4JP098XNMg',
		  'consumer_secret' => 'J0KPTsPr8RUU54owDIk1IvBV9YzLOCz11mChxZg90AQ',
		  'user_token'      => '14226606-hZXPWIM0xk9GdXeYkWAxoUuE2uETgvJM1kPMX2fYe',
		  'user_secret'     => 'w2IpKvENNUT3ZVmdKr5poJnMxirGfTlASIWC9Ftx6MAxG',
		);
		
		$this->load->library('TmhOAuth', $tmhOAuthConfig);
		$code="0";
		echo '<br/>Making call: '.$code.'<br/>';
		$code = $this->tmhoauth->request(
			   'POST',
			   'https://api.twitter.com/1.1/statuses/update.json',
			   array(
	 //		    'media[]'  => "@{$outFile};type=image/jpeg;filename={$outFile}",
			     'status'   => 'Second test 002',
			   ),
			   true, // use auth
			   true  // multipart
			 );

		echo "<br/>code: ".$code."---";
		print_r($this->tmhoauth->response);
	}
    
    public function logout(){
        //Create logout logic.
    }
	
	public function fbpost(){
		// TODO: Get profileid from POST
		$profileId = 2;
		
		$attachment =  array(
		'access_token' => "CAAUfQ6xo3DMBAPUDxtMCZBlYtfOaVU6TsNjnC3LpLrQGaxVP0whDvAEhc48GtgeQrqgHG3KIEKj0CAZAZANOQWSqrVcG0BAZB85YG7USGUHttSd5HNSsDrNJ4C3uZCgTHL8BM1N1ZAcCifLpjtmXp5h3dcoPPVjzMAxyFCwJY36Dde7i5R2RAi",
		'message' => "This is a test",
		'name' => "Name",
		'link' => "http://www.greenzeta.com",
		'description' => 'Description Here',
		'picture'=>""
		//'actions' => json_encode(array('name' => $action_name,'link' => $action_link))
		);
		
		print_r($attachment);
		
		echo "-- about to send --";
		
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,'https://graph.facebook.com/1057805234/feed');
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $attachment);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  //to suppress the curl output 
		$result = curl_exec($ch);
		curl_close ($ch);
		
		echo "result: ";
		print_r($result);
	}
    
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */