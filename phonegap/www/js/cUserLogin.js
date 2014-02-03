function UserLogin(){
    
    this.panel = new Popup('userlogin');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnfacebook').click(this.DoLogin(this,'fb'));

}


UserLogin.prototype.DoLogin = function(self,pPlatform){
	return function(){
		
		switch(pPlatform){
			case 'fb':
				var ref = window.open('http://theprizeinside.com/reactor/oauth/login/facebook', '_blank', 'location=yes');
				break;
			case 'tw':
				alert('tw login here');
				break;
			case 'fs':
				alert('fs login here');
				break;
		}
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
