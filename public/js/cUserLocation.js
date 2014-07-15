function UserLocation(){
    
    this.panel = new Popup('userlocation');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnlocsearch').click(this.DoLocationSearch(this));
	this.panel.elem.find('#btngpssearch').click(this.DoGPSSearch(this));

}


UserLocation.prototype.DoLocationSearch = function(self){
	return function(){
		
		// Disable the gps refresh
		window.clearInterval(locationTimer);
		
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
		window.clearInterval(locationTimer);
		userLocation = new google.maps.LatLng(0,0);
		QueryLocation();
		//locationTimer = window.setInterval(QueryLocation,LOCATION_CK_INTERVAL);
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
    
    //this.panel.Show();
    
    DebugOut('showing popup: '+this.panel.elem.attr('id'));
    
    this.panel.elem.show();
    
    if(gaPlugin){
    	gaPlugin.trackEvent( GASuccess, GAFail, "PopupShow", this.panel.elem.attr('id'), "", 1);
    }else{
    	_gaq.push(['_trackEvent', 'PopupShow', this.panel.elem.attr('id'), '']);
    }
    
    return true;
};
