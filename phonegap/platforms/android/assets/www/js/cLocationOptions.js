function LocationOptions(){
    
    this.panel = new MessageBox('locationoptions');
	
	this.panel.elem.find('.close').click(this.Close(this));
	

}

LocationOptions.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

LocationOptions.prototype.Load = function(pLocation){
	
	DebugOut("Location:");
	DebugOut(pLocation);
	
	var streeturl = "http://maps.googleapis.com/maps/api/streetview?location="+pLocation.location.address+","+pLocation.location.postalCode+"&size=640x640&sensor=false";
	
	streeturl = streeturl.split(' ').join('%20');
	
	// Clear out panel fields
    this.panel.elem.find('.name').empty();
    this.panel.elem.find('.fn').empty();
    this.panel.elem.find('.street-address').empty();
    this.panel.elem.find('.region').empty();
    this.panel.elem.find('.postal-code').empty();
    this.panel.elem.find('.country-name').empty();
    this.panel.elem.find('.tel').empty();
    
    // Fill in the Location info
    this.panel.elem.find('.name').html(pLocation.name);
    this.panel.elem.find('.showdirections, .mapdirections').click(function(){
    	//alert('http://maps.google.com/?saddr='+userLocation.lat()+','+userLocation.lng()+'&daddr='+pLocation.location.address+','+pLocation.location.postalCode);
    	window.open('http://maps.google.com/?saddr='+userLocation.lat()+','+userLocation.lng()+'&daddr='+pLocation.location.address+','+pLocation.location.postalCode, '_system');
    	_gaq.push(['_trackEvent', 'External', 'Driving Directions', '']);
    	return false;
    });
    
    this.panel.elem.find('.showwebsite').click(function(){
        //alert('http://maps.google.com/?saddr='+userLocation.lat()+','+userLocation.lng()+'&daddr='+pLocation.location.address+','+pLocation.location.postalCode);
        window.open(pLocation.url, '_system');
        _gaq.push(['_trackEvent', 'External', 'Restaurant Site', '']);
        return false;
    });
    
    DebugOut('url(\''+streeturl+'\');');
    //this.panel.elem.css('background-image','url('+streeturl+')');
    
    this.panel.elem.find('.fn').html(pLocation.name);
    this.panel.elem.find('.street-address').html(pLocation.location.address);
    this.panel.elem.find('.city').html(pLocation.location.city);
    this.panel.elem.find('.region').html(pLocation.location.state);
    this.panel.elem.find('.postal-code').html(pLocation.location.postalCode);
    this.panel.elem.find('.country-name').html(pLocation.location.country);
    //this.panel.elem.find('.tel').html(pLocation);
	
	this.panel.elem.find('.showcheckin').off('click');
	this.panel.elem.find('.showcheckin').click(this.Checkin(this,null,pLocation));
    
    this.Show();  
};

LocationOptions.prototype.Checkin = function(self,pPrize,pLocation){
   return function(){
       panel['checkin'].Load(pPrize,pLocation);
       self.panel.Hide();
       return false;
   };
};


LocationOptions.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    
    
    return true;
};
