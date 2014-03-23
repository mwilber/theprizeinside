function CheckinPop(){
    
    this.panel = new MessageBox('checkinpop');
	
	this.panel.elem.find('.close').click(this.Close(this));
	

}

CheckinPop.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

CheckinPop.prototype.Load = function(pId){
	
	this.panel.elem.find('.prizeimage').attr('src','');
	this.panel.elem.find('.prizeimage').hide();
	this.panel.elem.find('.prizecomment').html('');
	//this.panel.elem.find('.locationmap').attr('src','');
	//this.panel.elem.find('.locationmap').hide();
	
	this.panel.elem.find('.prizename').html('');
	this.panel.elem.find('.restaurantname').html('');
	this.panel.elem.find('.nickname').html('');
	this.panel.elem.find('.avatar').attr('src','');
	//this.panel.elem.find('.number').html('');
	
	$.get(apipath+'/reactor/srvlist/getcheckindetail/'+pId,this.HandleCheckinData(this));
      
};

CheckinPop.prototype.HandleCheckinData = function(self){
    return function(response) {
    	DebugOut("checkin data incoming...");
        console.log(response);
        
        if(wallmap && response.checkin.checkinLat != ""){
	        var mapOffsetX = ($(window).width()*.25)-150;
	        var mapOffsetY = ($(window).height()*.1)+50;
	        wallmap.setCenter(new google.maps.LatLng(response.checkin.checkinLat,response.checkin.checkinLng));
	        wallmap.setZoom(17);
	        wallmap.panBy(-mapOffsetX, -mapOffsetY);
	    }
        
        if( response.checkin.checkinPhoto != "" ){
        	self.panel.elem.find('.prizeimage').attr('src',response.checkin.checkinPhoto);
        	self.panel.elem.find('.prizeimage').show();
        }
        
        // if( response.checkin.checkinLat != "" && response.checkin.checkinLng != "" && response.checkin.checkinLat != 0 && response.checkin.checkinLng != 0 ){
        	// var mapurl = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size="+Math.floor(self.panel.elem.width()/4)+"x"+Math.floor(self.panel.elem.width()/4)+"&maptype=roadmap&markers=color:red%7Clabel:C%7C"+response.checkin.checkinLat+","+response.checkin.checkinLng+"&sensor=false";
			// self.panel.elem.find('.locationmap').attr('src',mapurl);
			// self.panel.elem.find('.locationmap').show();
		// }
        
		self.panel.elem.find('.prizecomment').html(response.checkin.checkinComment);
		self.panel.elem.find('.prizename').html(response.prize.prizeName);
		self.panel.elem.find('.restaurantname').html(response.restaurant.restaurantName);
		self.panel.elem.find('.nickname').html(response.profile.profileNickname);
		self.panel.elem.find('.avatar').attr('src',response.profile.profilePicture);
		//self.panel.elem.find('.number').html(response.profile.count);
		
		//self.SetPosition();
	    
	    self.panel.elem.fadeIn(); 
    };
};

CheckinPop.prototype.Checkin = function(self,pPrize,pLocation){
   return function(){
       panel['checkin'].Load(pPrize,pLocation);
       self.panel.Hide();
       return false;
   };
};


CheckinPop.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    
    
    return true;
};
