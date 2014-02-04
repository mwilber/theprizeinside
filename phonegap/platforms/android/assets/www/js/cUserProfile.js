function UserProfile(){
    
    this.panel = new Popup('userprofile');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnsave').click(this.DoProfileSave(this));
	
	this.panel.elem.find('#addfacebook').click(this.DoLogin(this,'fb'));
	
	this.panel.elem.find('#addtwitter').click(this.DoLogin(this,'tw'));

}

UserProfile.prototype.DoLogin = function(self,pPlatform){
    return function(){

        switch(pPlatform){
            case 'fb':
                ref = window.open('http://theprizeinside.com/reactor/oauth/login/facebook/%20/'+lsUserId, '_blank', 'location=yes');
                break;
            case 'tw':
                ref = window.open('http://theprizeinside.com/reactor/oauth/login/twitter/%20/'+lsUserId, '_blank', 'location=yes');
                break;
            case 'fs':
                ref = window.open('http://theprizeinside.com/reactor/oauth/login/foursquare/%20/'+lsUserId, '_blank', 'location=yes');
                break;
        }

        self.ref.addEventListener('loadstop', self.HandleAuthPopup);

    };
};


UserProfile.prototype.DoProfileSave = function(self){
	return function(){
		
		alert('FPO');
	};
};

UserProfile.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

UserProfile.prototype.Load = function(){
	
	if( lsUserId > 0 ){
	    
	    this.Show();  
	}else{
	    panel['userlogin'].Load();
	}
};


UserProfile.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
