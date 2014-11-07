function CheckinDetail(){
    
    this.panel = new Popup('checkindetail');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('.prizeimage').click(this.Lightbox(this));
	
	this.panel.elem.find('.postshare').click(this.Share(this));
	
	this.prizeLink = "";
    this.prizeName = "";
    this.prizeImage = "";
    this.prizeMessage = "";

}

CheckinDetail.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

CheckinDetail.prototype.Lightbox = function(self){
   return function(){
       $('#lightbox img').attr('src',self.panel.elem.find('.prizeimage').attr('src'));
       $('#lightbox').fadeIn();
       return false;
   };
};

CheckinDetail.prototype.Share = function(self){
   return function(){
       panel['share'].Load(self.prizeName, self.prizeLink, self.prizeImage, self.prizeMessage);
       return false;
   };
};

CheckinDetail.prototype.Load = function(pId){
	
	this.panel.elem.find('.prizeimage').attr('src','');
	this.panel.elem.find('.prizeimage').hide();
	this.panel.elem.find('.prizecomment').html('');
	this.panel.elem.find('.locationmap').attr('src','');
	this.panel.elem.find('.locationmap').hide();
	
	this.panel.elem.find('.prizename').html('');
	this.panel.elem.find('.restaurantname').html('');
	this.panel.elem.find('.nickname').html('');
	this.panel.elem.find('.avatar').attr('src','');
	this.panel.elem.find('.number').html('');
	
	$.get(apipath+'/reactor/srvlist/getcheckindetail/'+pId,this.HandleCheckinData(this));
    
    this.Show();  
};

CheckinDetail.prototype.SetPosition = function(){
	
	this.panel.elem.css("margin-top",Math.floor( (panel['home'].panel.elem.height()-this.panel.elem.height())/3) );
};

CheckinDetail.prototype.HandleCheckinData = function(self){
    return function(response) {
    	DebugOut("checkin data incoming...");
        DebugOut(response);
        
        self.prizeName = response.prize.prizeName;
        if( response.checkin.checkinComment != "" ){
        	self.prizeMessage = response.checkin.checkinComment;
        }else{
        	self.prizeMessage = social['description'];
        }
        self.prizeLink = 'http://theprizeinside.com/ck/'+response.checkin.checkinToken;
        
        if( response.checkin.checkinPhoto != "" ){
        	self.panel.elem.find('.prizeimage').attr('src',response.checkin.checkinPhoto);
        	self.panel.elem.find('.prizeimage').show();
        	self.prizeImage = response.checkin.checkinPhoto;
        }
        
        if( response.checkin.checkinLat != "" && response.checkin.checkinLng != "" && response.checkin.checkinLat != 0 && response.checkin.checkinLng != 0 ){
        	var mapurl = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size="+Math.floor(self.panel.elem.width()/4)+"x"+Math.floor(self.panel.elem.width()/4)+"&maptype=roadmap&markers=color:red%7Clabel:C%7C"+response.checkin.checkinLat+","+response.checkin.checkinLng+"&sensor=false";
			self.panel.elem.find('.locationmap').attr('src',mapurl);
			self.panel.elem.find('.locationmap').show();
		}
        
		self.panel.elem.find('.prizecomment').html(response.checkin.checkinComment);
		self.panel.elem.find('.prizename').html(response.prize.prizeName);
		self.panel.elem.find('.restaurantname').html(response.restaurant.restaurantName);
		self.panel.elem.find('.nickname').html(response.profile.profileNickname);
		self.panel.elem.find('.avatar').attr('src',response.profile.profilePicture);
		self.panel.elem.find('.number').html(response.profile.count);
		
		self.SetPosition();
    };
};


CheckinDetail.prototype.Show = function(){
    this.panel.elem.show();
    return true;
};
