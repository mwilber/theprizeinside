function UserProfile(){
    
    this.panel = new Panel('userprofile');
    this.backId = "home";
	
	//this.panel.elem.find('.close').click(this.Close(this));
	this.panel.elem.find('.back').click(this.Back(this));
	
	this.panel.elem.find('#btnsave').click(this.DoProfileSave(this));
	this.panel.elem.find('#showedit').click(this.ShowProfileEdit(this));
	this.panel.elem.find('#showview').click(this.ShowProfileView(this));
	this.panel.elem.find('#btnlogout').click(this.DoLogout(this));
	
	this.panel.elem.find('#addfacebook').click(this.DoLogin(this,'fb'));
	this.panel.elem.find('#addtwitter').click(this.DoLogin(this,'tw'));
	this.panel.elem.find('#addfoursquare').click(this.DoLogin(this,'fs'));
	
	this.panel.elem.find('#btneditprofile').click(this.ShowEdit(this));
	this.panel.elem.find('#btnauthprofile').click(this.ShowAuth(this));
	this.panel.elem.find('#btnhistory').click(this.ShowHistory(this));
	
	this.ref = null;
}

UserProfile.prototype.Back = function(self){
   return function(){
       panel[self.backId].Show();
       return false;
   };
};

UserProfile.prototype.ShowEdit = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tabeditprofile').addClass('selected');
	   self.panel.elem.find('#editprofile').show();
	   
		if(gaPlugin){
    		gaPlugin.trackEvent( GASuccess, GAFail, "Profile", "ShowEdit", "", 1);
		}else{
	    	_gaq.push(['_trackEvent', 'Profile', 'ShowEdit', '']);
	    }
       return false;
   };
};

UserProfile.prototype.ShowAuth = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tabauthprofile').addClass('selected');
	   self.panel.elem.find('#authprofile').show();
	   
		if(gaPlugin){
    		gaPlugin.trackEvent( GASuccess, GAFail, "Profile", "ShowEdit", "", 1);
		}else{
	    	_gaq.push(['_trackEvent', 'Profile', 'ShowEdit', '']);
	    }
       return false;
   };
};

UserProfile.prototype.ShowHistory = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tabhistory').addClass('selected');
	   self.panel.elem.find('#history').show();
	   
		if(gaPlugin){
    		gaPlugin.trackEvent( GASuccess, GAFail, "Profile", "ShowHistory", "", 1);
		}else{
	    	_gaq.push(['_trackEvent', 'Profile', 'ShowHistory', '']);
	    }
       return false;
   };
};

UserProfile.prototype.DoLogout = function(self){
   return function(){
       lsUserId = -1;
       localStorage["userid"] = -1;
       
       if( lsUserId > 0 ){
            $('#home .showuserprofile').addClass('fa-user');
            $('#home .showuserprofile').removeClass('fa-sign-in');
        }else{
            $('#home .showuserprofile').addClass('fa-sign-in');
            $('#home .showuserprofile').removeClass('fa-user');
        }
       
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
                self.ref = window.open('http://theprizeinside.com/reactor/oauth/login/twitter/%20/'+lsUserId, '_blank', 'location=yes');
                break;
            case 'fs':
                self.ref = window.open('http://theprizeinside.com/reactor/oauth/login/foursquare/%20/'+lsUserId, '_blank', 'location=yes');
                break;
        }

        self.ref.addEventListener('loadstop', self.HandleAuthPopup(self));

    };
};

UserProfile.prototype.HandleAuthPopup = function(self){
	return function(event){
	//alert('url: '+event.url);
    if( String(event.url).indexOf('oauth/profile' ) > 0 ){
        var aviam= String(event.url).split("/");
        if( !isNaN(parseInt(aviam[aviam.length-1])) ){
            //alert("Profile found: "+aviam[aviam.length-1]); 
            lsUserId = parseInt(aviam[aviam.length-1]);
            localStorage["userid"] = parseInt(aviam[aviam.length-1]);
            self.ref.close();
            
            if( lsUserId > 0 ){
                $('#home .showuserprofile').addClass('fa-user');
                $('#home .showuserprofile').removeClass('fa-sign-in');
            }else{
                $('#home .showuserprofile').addClass('fa-sign-in');
                $('#home .showuserprofile').removeClass('fa-user');
            }
            
            panel['userprofile'].Load();
        }
    }
	};
};

UserProfile.prototype.DoProfileSave = function(self){
	return function(){
		
		//self.panel.elem.find('input.name').val(response.profile.profileFullname);
        //self.panel.elem.find('input.nickname').val(response.profile.profileNickname);
        $.post(apipath+'/reactor/profile/edit/'+self.panel.elem.find('.profileid').html(),{
            profileId: self.panel.elem.find('.profileid').html(),
            profileFullname: self.panel.elem.find('input.name').val(),
            profileNickname: self.panel.elem.find('input.nickname').val()
        },self.HandleProfileSave(self));
	};
};

UserProfile.prototype.HandleProfileSave = function(self){
   return function(){
       self.Load();
       return false;
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
		
		// hide the tab panels
		this.HideTabPanels();
		this.panel.elem.find('#history').show();
		this.panel.elem.find('.tabhistory').addClass('selected');
		
		this.panel.elem.find('.checkins').html("Loading...");
		this.panel.elem.find('.name').html("Loading...");
		this.panel.elem.find('.nickname').html("");
		this.panel.elem.find('.profileid').html("");
		this.panel.elem.find('.avatar').attr('src','');
		$('#authprofile a.button').show();
		$('#authprofile #authed').empty();
		
	    $.get(apipath+'/reactor/srvlist/getprofile/'+lsUserId,this.HandleProfileData(this));
	    $.get(apipath+'/reactor/srvlist/getcheckinsbyuser/'+lsUserId,this.HandleCheckinData(this));
	    this.Show();
	    var patsy = this.ShowProfileView(this);
	    patsy();
	    
	}else{
	    panel['userlogin'].Load();
	}
};

UserProfile.prototype.HandleProfileData = function(self){
    return function(response, textStatus) {
    	DebugOut("prize data incoming...");
        DebugOut(response);

        self.panel.elem.find('.name').html(response.profile.profileFullname);
        self.panel.elem.find('input.name').val(response.profile.profileFullname);
		self.panel.elem.find('.nickname').html(response.profile.profileNickname);
		self.panel.elem.find('input.nickname').val(response.profile.profileNickname);
		self.panel.elem.find('.avatar').attr('src',response.profile.profilePicture);
		self.panel.elem.find('.profileid').html(response.profile.profileId);
		
		for( idx in response.profile.auth ){
		  var tmpAuthMarker = $('<div/>').addClass('fa');
		  
		  switch(response.profile.auth[idx].authService){
		      case 'Facebook':
		          tmpAuthMarker.addClass('fa-facebook-square');
		          $('#addfacebook').hide();
		          break;
		      case 'Twitter':
                  tmpAuthMarker.addClass('fa-twitter-square');
                  $('#addtwitter').hide();
                  break;
              case 'Foursquare':
                  tmpAuthMarker.addClass('fa-foursquare');
                  $('#addfoursquare').hide();
                  break;
		  }
		
		  self.panel.elem.find('#authed').append(tmpAuthMarker);
		}
		
		if(self.panel.elem.find('.addservice').length > response.profile.auth.length){
			self.panel.elem.find('#addservicecopy').show();
		}
    };
};

UserProfile.prototype.HandleCheckinData = function(self){
    return function(response) {
    	DebugOut("checkin data incoming...");
        DebugOut(response);
        
        self.panel.elem.find('#btnhistory').html(response.checkins.length+' Prizes');
        
        self.panel.elem.find('.checkins').empty();
         for( idx in response.checkins ){
             var value = response.checkins[idx];
             self.panel.elem.find('.checkins').append($('<li>')
                 .append(
                     $('<div/>').addClass('details fa fa-caret-right')
                 )
                 .append(
                     $('<div/>').addClass('icon').append($('<img/>').attr('src',value.checkinPhoto))
                 )
                 .append(
                     $('<div/>').addClass('comment').html(value.checkinComment)
                 )
                 .click(self.HandleCheckinClick(self,value))
            ); 
         }
    };
};

UserProfile.prototype.HandleCheckinClick = function(self,pCheckin){
	return function(event){
		panel['checkindetail'].Load(pCheckin.checkinId);
        return false;
	};
};

UserProfile.prototype.HideTabPanels = function()
{
	this.panel.elem.find('.tabpanel').hide();
	this.panel.elem.find('.tabs li').removeClass('selected');
};


UserProfile.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
