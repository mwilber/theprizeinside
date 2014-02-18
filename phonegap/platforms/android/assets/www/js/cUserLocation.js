function UserLocation(){
    
    this.panel = new Popup('userlocation');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnlocsearch').click(this.DoLocationSearch(this));
	this.panel.elem.find('#btngpssearch').click(this.DoGPSSearch(this));

}


UserLocation.prototype.DoLocationSearch = function(self){
	return function(){
		
		var searchloc = self.panel.elem.find('#loctext').val();
		
		DebugOut('getting coords for: '+searchloc);
		
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': searchloc}, function(results, status) {
        	if (status == google.maps.GeocoderStatus.OK) {
        		//$('#locationbox').fadeOut();
        		HandleGeolocationQuery({coords:{latitude:results[0].geometry.location.lat(), longitude:results[0].geometry.location.lng()}});
        	} else {
        		alert('Could not find address: ' + status);
        	}
        });
	};
};

UserLocation.prototype.DoGPSSearch = function(self){
	return function(){
		QueryLocation();
	};
};

UserLocation.prototype.Update = function(){
	var mapurl = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size=200x200&maptype=roadmap&markers=color:red%7Clabel:C%7C"+userLocation.lat()+","+userLocation.lng()+"&sensor=false";
	this.panel.elem.find('.locationmap').attr('src',mapurl);
	
	this.panel.elem.find('.location span').html(userLocation.lat()+", "+userLocation.lng());
};

UserLocation.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

UserLocation.prototype.Load = function(){
	
	//this.SetMap();
	//this.panel.elem.find('.location span').html(userLocation.lat()+", "+userLocation.lng());
    
    this.Show();  
};


UserLocation.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
