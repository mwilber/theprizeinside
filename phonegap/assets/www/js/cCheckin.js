function Checkin(){
    
    this.panel = new Popup('checkin');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#setpic').click(this.TakePhoto(this));
    
    //this.panel.elem.find('.tourhome').click(
    //    function(){
    //        panel['tourhome'].Show();
    //        return false;
    //    }
    //);
    
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
    var image = document.getElementById('myImage');
    image.src = "data:image/jpeg;base64," + imageData;
	DebugOut('ABOUT TO POST');
	$.post(apipath+'/reactor/checkin/add',{
		checkinLocation:'zzz',
		checkinPhoto:imageData
	},function(response){DebugOut('POST CALLBACK'); DebugOut(response);});
	DebugOut('POST OUT');
};

Checkin.prototype.HandleCheckinResponse = function(){
	//return function(){
		alert('done');
	//};
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

Checkin.prototype.Load = function(){
    
    // Load panel data
    //this.panel.elem.find('.prizes').empty().append($('<li/>').html('loading...'));
    //alert('ajax call tooo: '+apipath+'/tinderbox/city/json/all');
    
    // Simulate the ajax call for now
    //var patsy = this.HandlePrizeData(this);
    //patsy(prizedata);
    // Real ajax call --
    //                 |
    //                \/
    //$.get(apipath+'/reactor/speaker/json/event/'+pId+'/speaker',this.HandlePrizeData(this));
    
    this.Show();  
};


Checkin.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
