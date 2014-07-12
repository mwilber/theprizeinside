function UserLogin(){
    
    this.panel = new Popup('userlogin');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnfacebook').click(this.DoLogin(this,'fb'));
	this.panel.elem.find('#btntwitter').click(this.DoLogin(this,'tw'));
	this.panel.elem.find('#btnfoursquare').click(this.DoLogin(this,'fs'));
	this.panel.elem.find('#btnanon').click(this.DoLogin(this,'a'));
	
	this.ref = null;

}


UserLogin.prototype.DoLogin = function(self,pPlatform){
	return function(){

		switch(pPlatform){
			case 'fb':
				self.ref = window.open(apipath+'/reactor/oauth/login/facebook', '_blank', 'location=yes');
				//self.ref = window.open('http://gibson.loc/theprizeinside/reactor/oauth/profile/31', '_blank', 'location=yes');
				//var ref = window.open('http://theprizeinside.com/reactor/oauth/profile/31', '_blank', 'location=yes');
				break;
			case 'tw':
				self.ref = window.open(apipath+'/reactor/oauth/login/twitter', '_blank', 'location=yes');
				break;
			case 'fs':
				self.ref = window.open(apipath+'/reactor/oauth/login/foursquare', '_blank', 'location=yes');
				break;
			case 'a':
                self.ref = window.open(apipath+'/reactor/oauth/anonymous', '_blank', 'location=yes');
                break;
		}

		self.ref.addEventListener('loadstop', self.HandleAuthPopup(self));

	};
};

UserLogin.prototype.HandleAuthPopup = function(self){
	return function(event){
	//alert('url: '+event.url);
    if( String(event.url).indexOf('oauth/profile' ) > 0 ){
        var aviam= String(event.url).split("/");
        if( !isNaN(parseInt(aviam[aviam.length-1])) ){
            //alert("Profile found: "+aviam[aviam.length-1]); 
            lsUserId = parseInt(aviam[aviam.length-1]);
            localStorage["userid"] = parseInt(aviam[aviam.length-1]);
            panel['userlogin'].ref.close();
            panel['userlogin'].panel.Hide();
            // Clear out the autocheck val so the checkin prompts again
            autoCkLocation = new google.maps.LatLng(0,0);
            QueryLocation();
        }
    }
	};
};

UserLogin.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

UserLogin.prototype.Load = function(pShowAnon){
    
    this.Show();
	
	if( pShowAnon === true ){
	    this.panel.elem.find('#btnanon').show();
	}else{
	   this.panel.elem.find('#btnanon').hide(); 
	}
      
};


UserLogin.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
