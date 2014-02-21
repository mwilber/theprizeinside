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
	//TODO: Need default image here
	this.panel.elem.find('.prizecomment').html('');
	
	$.get(apipath+'/reactor/srvlist/getcheckindetail/'+pId,this.HandleCheckinData(this));
    
    this.Show();  
};

CheckinDetail.prototype.HandleCheckinData = function(self){
    return function(response) {
    	DebugOut("checkin data incoming...");
        DebugOut(response);
        
        if( response.checkin.checkinPhoto != "" ){
        	self.panel.elem.find('.prizeimage').attr('src',response.checkin.checkinPhoto);
        	self.panel.elem.find('.prizeimage').show();
        }
        
		self.panel.elem.find('.prizecomment').html(response.checkin.checkinComment);
		self.panel.elem.find('.prizename').html(response.prize.prizeName);
		self.panel.elem.find('.restaurantname').html(response.restaurant.restaurantName);
		self.panel.elem.find('.nickname').html(response.profile.profileNickname);
		self.panel.elem.find('.avatar').attr('src',response.profile.profilePicture);
		self.panel.elem.find('.number').html(response.profile.count);
    };
};


CheckinDetail.prototype.Show = function(){
    this.panel.elem.show();
    return true;
};
