function UserLogin(){
    
    this.panel = new Popup('userlogin');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnfacebook').click(this.DoLogin(this,'fb'));

}


UserLogin.prototype.DoLogin = function(self,pPlatform){
	return function(){
		
		var ref = null;
		
		switch(pPlatform){
			case 'fb':
				ref = window.open('http://theprizeinside.com/reactor/oauth/login/facebook', '_blank', 'location=yes');
				//var ref = window.open('http://gibson.loc/theprizeinside/reactor/oauth/profile/31', '_blank', 'location=yes');
				//var ref = window.open('http://theprizeinside.com/reactor/oauth/profile/31', '_blank', 'location=yes');
				break;
			case 'tw':
				alert('tw login here');
				break;
			case 'fs':
				alert('fs login here');
				break;
		}
		
		ref.addEventListener('loadstop', function(event){ 
			
			if( event.url.indexOf('oauth/profile' ) > 0 ){
				var aviam= event.url.split("/");
				if( !isNaN(parseInt(aviam[aviam.length-1])) ){
					alert("Profile found: "+aviam[aviam.length-1]); 
					ref.close();
				}
			}
		});
	};
};

UserLogin.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

UserLogin.prototype.Load = function(){
	
	
    
    this.Show();  
};


UserLogin.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
