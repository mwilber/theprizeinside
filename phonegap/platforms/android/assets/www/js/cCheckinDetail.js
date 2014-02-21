function CheckinDetail(){
    
    this.panel = new Popup('checkindetail');
	
	this.panel.elem.find('.close').click(this.Close(this));
	

}

CheckinDetail.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
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
        
        if( response.checkin.checkinPhoto != "" ){
        	self.panel.elem.find('.prizeimage').attr('src',response.checkin.checkinPhoto);
        	self.panel.elem.find('.prizeimage').show();
        }
        
        if( response.checkin.checkinLat != "" && response.checkin.checkinLng != "" ){
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
