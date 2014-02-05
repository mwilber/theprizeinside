function UserProfile(){
    
    this.panel = new Popup('userprofile');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnsave').click(this.DoProfileSave(this));
	this.panel.elem.find('#showedit').click(this.ShowProfileEdit(this));
	this.panel.elem.find('#showview').click(this.ShowProfileView(this));
	this.panel.elem.find('#btnlogout').click(this.DoLogout(this));
	
	this.panel.elem.find('#addfacebook').click(this.DoLogin(this,'fb'));
	
	this.panel.elem.find('#addtwitter').click(this.DoLogin(this,'tw'));
	
	this.ref = null;
}

UserProfile.prototype.DoLogout = function(self){
   return function(){
       lsUserId = 0;
       localStorage["userid"] = 0;
       self.panel.Hide();
       return false;
   };
};

UserProfile.prototype.ShowProfileEdit = function(self){
   return function(){
       self.panel.elem.find('#viewprofile').hide();
       self.panel.elem.find('#editprofile').show();
       return false;
   };
};

UserProfile.prototype.ShowProfileView = function(self){
   return function(){
       self.panel.elem.find('#editprofile').hide();
       self.panel.elem.find('#viewprofile').show();
       return false;
   };
};

UserProfile.prototype.DoLogin = function(self,pPlatform){
    return function(){

        switch(pPlatform){
            case 'fb':
                self.ref = window.open('http://theprizeinside.com/reactor/oauth/login/facebook/%20/'+lsUserId, '_blank', 'location=yes');
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

UserProfile.prototype.HandleAuthPopup = function(event){
    if( String(event.url).indexOf('oauth/profile' ) > 0 ){
        var aviam= String(event.url).split("/");
        if( !isNaN(parseInt(aviam[aviam.length-1])) ){
            DebugOut("Profile found: "+aviam[aviam.length-1]); 
            lsUserId = parseInt(aviam[aviam.length-1]);
            localStorage["userid"] = parseInt(aviam[aviam.length-1]);
            this.ref.close();
            panel['userprofile'].Load();
        }
    }
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
		
		this.panel.elem.find('.name').html("Loading...");
		this.panel.elem.find('.nickname').html("");
		this.panel.elem.find('.profileid').html("");
		this.panel.elem.find('.avatar').attr('src','');
		
	    $.get(apipath+'/reactor/srvlist/getprofile/'+lsUserId,this.HandleProfileData(this));
	    this.Show();  
	}else{
	    panel['userlogin'].Load();
	}
};

UserProfile.prototype.HandleProfileData = function(self){
    return function(response, textStatus) {
    	DebugOut("prize data incoming...");
        DebugOut(response);

        self.panel.elem.find('.name').html(response.profile.profileFullname);
		self.panel.elem.find('.nickname').html(response.profile.profileNickname);
		self.panel.elem.find('.avatar').attr('src',response.profile.profilePicture);
		self.panel.elem.find('.profileid').html(response.profile.profileId);
    };
};


UserProfile.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
