function Checkin(){
    
    this.panel = new Popup('checkin');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#setpic').click(this.TakePhoto(this));
	
	this.panel.elem.find('#btnCheckin').click(this.DoCheckin(this));
	
	this.postData = {
		checkinLocation: '',
		checkinLat: '',
		checkinLng: '',
		checkinComment: '',
		checkinPhoto: '',
		checkinAnonymous: '',
		profileId: '',
		restaurantId: '',
		prizeId: ''
	};
    
}

Checkin.prototype.TakePhoto = function(self){
	return function(){
		navigator.camera.getPicture(self.onSuccess, self.onFail, { 
		    quality: 80,
	        destinationType: destinationType.DATA_URL,
			correctOrientation: true,
			encodingType: Camera.EncodingType.JPEG,
  			targetWidth: 1024,
  			targetHeight: 1024,
  			saveToPhotoAlbum: false
    	    });
	};
	 

};

Checkin.prototype.onSuccess = function(imageData) {
	
	panel['checkin'].postData.checkinPhoto = imageData;
	
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + panel['checkin'].postData.checkinPhoto;
	
	
};

Checkin.prototype.DoCheckin = function(self){
	return function(){
		
		self.postData.checkinComment = self.panel.elem.find('#checkinComment').val();
		if(self.panel.elem.find('#checkinAnonymous').prop('checked')){
			self.postData.checkinAnonymous = 1;
		}else{
			self.postData.checkinAnonymous = 0;
		}
		
		$.post(apipath+'/reactor/checkin/add/json',self.postData,function(response){alert(response);});
	};
};

Checkin.prototype.HandleCheckinResponse = function(self){
	return function(){
		self.Close();
	};
};

Checkin.prototype.onFail = function(message) {
    alert('Failed because: ' + message);
};

Checkin.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

Checkin.prototype.Load = function(pPrize, pLocation){
	
	this.panel.elem.find('#myImage').attr('src','img/add_photo.png');
	
	this.postData.checkinLocation = pLocation.id;
	this.postData.checkinLat = pLocation.location.lat;
	this.postData.checkinLng = pLocation.location.lng;
	this.postData.profileId = parseInt('1');
	this.postData.prizeId = parseInt(panel['prize'].prizeid);
	this.postData.restaurantId = parseInt(panel['prize'].restaurantid);
    
    DebugOut(panel['prize']);
    DebugOut(this.postData);
    
    this.Show();  
};


Checkin.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
