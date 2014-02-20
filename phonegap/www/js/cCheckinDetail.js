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
	
	$.get(apipath+'/reactor/srvlist/getcheckindetail/'+pId,this.HandleCheckinData(this));
    
    this.Show();  
};

CheckinDetail.prototype.HandleCheckinData = function(self){
    return function(response) {
    	DebugOut("checkin data incoming...");
        DebugOut(response);

        self.panel.elem.find('.name').html(response.profile.profileFullname);
        self.panel.elem.find('input.name').val(response.profile.profileFullname);
		self.panel.elem.find('.nickname').html(response.profile.profileNickname);
		self.panel.elem.find('input.nickname').val(response.profile.profileNickname);
		self.panel.elem.find('.avatar').attr('src',response.profile.profilePicture);
		self.panel.elem.find('.profileid').html(response.profile.profileId);
    };
};


CheckinDetail.prototype.Show = function(){
    this.panel.elem.show();
    return true;
};
