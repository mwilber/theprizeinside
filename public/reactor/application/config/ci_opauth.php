<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['opauth_config'] = array(
    'path' => '/reactor/oauth/login/', //example: /ci_opauth/auth/login/
	'callback_url' => '/reactor/oauth/authenticate/', //example: /ci_opauth/auth/authenticate/
    'callback_transport' => 'post', //Codeigniter don't use native session
    'security_salt' => 'b0nh3ad!',
    'debug' => false,
    'Strategy' => array( //comment those you don't use
        'Twitter' => array(
            'key' => 'G21e48OkiD1A4JP098XNMg',
            'secret' => 'J0KPTsPr8RUU54owDIk1IvBV9YzLOCz11mChxZg90AQ'
        ),
        'Facebook' => array(
            'app_id' => '314668331957423',
            'app_secret' => '6697bdeeba7f1c36e03e854dec1d7c29',
            'scope' => 'publish_stream,user_photos'
        ),
        'Foursquare' => array(
		    'client_id' => 'UMRUA4UFFY0RLEI1TKGXUT30JLQULNFRM3YVQWNCASQ3VE31',
		    'client_secret' => '4XSWL2PUIN02A3RNJY4GFRCLISF4RPC3URLVLHK2AOQD0EQ5'
		)
        //'Google' => array(
        //    'client_id' => 'client_id',
        //    'client_secret' => 'client_secret'
        //),
        //'OpenID' => array(
		//	'openid_url' => 'openid_url'
		//)
    )
);

/* End of file ci_opauth.php */
/* Location: ./application/config/ci_opauth.php */
