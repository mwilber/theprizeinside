function Prize(){
    
    this.panel = new Panel('prize');
    this.backId = "home";
    
    this.restaurantid = null;
    this.restaurantalias = null;
    this.prizeid = null;
    this.locmap = null;
    this.bounds = new google.maps.LatLngBounds();
    this.markersArray = [];
    this.infowindow = new google.maps.InfoWindow({
        content: "this is a test"
    });
    this.locationdata = null;
    
    this.panel.elem.find('.back').click(this.Back(this));
    this.panel.elem.find('.showuserlocation').click(this.ShowUserLocation(this));
	this.panel.elem.find('#btnlocations').click(this.ShowLocations(this));
	this.panel.elem.find('#btnmap').click(this.ShowMap(this));
	this.panel.elem.find('#btncomments').click(this.ShowComments(this));
	
}

Prize.prototype.ShowUserLocation = function(self){
   return function(){
       panel['userlocation'].Load();
       return false;
   };
};

Prize.prototype.Back = function(self){
   return function(){
       panel[self.backId].Show();
       return false;
   };
};

Prize.prototype.ShowLocations = function(self){
   return function(){
       self.HideTabPanels();
	   self.panel.elem.find('#locations').show();
       return false;
   };
};

Prize.prototype.ShowMap = function(self){
   return function(){
       self.HideTabPanels();
	   self.panel.elem.find('#map').show();
	   if( !self.locmap ) self.InitMap(self); 
       return false;
   };
};

Prize.prototype.ShowComments = function(self){
   return function(){
       self.HideTabPanels();
	   self.panel.elem.find('#comments').show();
       return false;
   };
};

Prize.prototype.Load = function(pPrize){
    
    // Clear out panel fields
    this.panel.elem.find('#locations ul').empty().append($('<li/>').html('loading...'));
	this.panel.elem.find('#comments ul').empty().append($('<li/>').html('loading...'));
    this.panel.elem.find('.name').empty();
    this.panel.elem.find('.showwebsite').attr('href','');
    this.panel.elem.find('#prizephoto').attr('src','');
    this.restaurantid = null;
    
    // hide the tab panels
	this.HideTabPanels();
    
    
    // Get the restaurant id
    this.restaurantid = pPrize.restaurant.restaurantId;
    this.restaurantalias = pPrize.restaurant.restaurantAlias;
    try{
    	this.prizeid = pPrize.prizeId;
    	for( idx in pPrize.checkins ){
    		DebugOut("Checkin Photo: "+pPrize.checkins[idx].checkinPhoto);
    		if( pPrize.checkins[idx].checkinPhoto != "" ){
    			this.panel.elem.find('#prizephoto').attr('src',pPrize.checkins[idx].checkinPhoto);
    			break;
    		}
    	}
    }catch(e){
    	this.prizeid = 0;
    	this.panel.elem.find('#prizephoto').attr('src','');
    }
    
    // Fill in the prize info

    this.panel.elem.find('.name').html(pPrize.prizeName);
    
    this.panel.elem.find('.showwebsite').attr('href',pPrize.restaurant.restaurantUrl);

    this.Show(); 
    
    DebugOut('name: '+ this.panel.elem.find('.name').height());
    DebugOut('tabs: '+ this.panel.elem.find('.tabs').height());
    DebugOut('header: '+ this.panel.elem.find('.header').height());
    
    var offsetheight =  this.panel.elem.find('.header').height()+this.panel.elem.find('.tabs').height()+this.panel.elem.find('.name').height()+(parseInt(this.panel.elem.find('.name').css('padding-top'))*2);
    
    DebugOut('offsetheight: '+offsetheight);
    
    // Size the map to fit the panel
    this.panel.elem.find('.tabpanel').css('width',this.panel.elem.width()+"px");
    this.panel.elem.find('.tabpanel').css('height',(this.panel.elem.height()-offsetheight)+"px");
    
    var patsy = this.HandleLocationData(this);
    patsy(fsdata[this.restaurantalias]);
};

Prize.prototype.GetLocationDataB = function(){
    // Simulate the ajax call for now
    //DebugOut('Loading locations: '+pPrize.restaurantAlias);
    var patsy = this.HandleLocationData(this);
    patsy(fsdata[pPrize.restaurant.restaurantAlias]);
    // Real ajax call --
    //                 |
    //                \/
    //$.get('https://api.foursquare.com/v2/venues/search?client_id=UMRUA4UFFY0RLEI1TKGXUT30JLQULNFRM3YVQWNCASQ3VE31&client_secret=4XSWL2PUIN02A3RNJY4GFRCLISF4RPC3URLVLHK2AOQD0EQ5&v=20130815&ll='+userLocation.lat()+','+userLocation.lng()+'&limit=10&query='+this.restaurantid,this.HandleLocationData(this));
    
};

Prize.prototype.HandleLocationData = function(self){
    return function(response, textStatus) {
        DebugOut(response);
        
        self.locationdata = response.response;
        
		self.panel.elem.find('#locations').show();
		self.panel.elem.find('#locations ul').empty();
		
        for( idx in response.response.venues ){
            var value = response.response.venues[idx];
			
			if( value.location.address !== undefined ){
	            self.panel.elem.find('#locations ul').append($('<li>')
	                 .append(
	                     $('<div/>').addClass('details fa fa-caret-right')
	                 )
	                 .append(
	                     $('<div/>').addClass('address').html(value.location.address)
	                 )
					 .append(
	                     $('<div/>').addClass('city').html(value.location.city+", "+value.location.state+" "+value.location.postalCode)
	                 )
	                 .click(self.HandleLocationClick(self,value))
	            );
           	}
         }
		 
    };
};

Prize.prototype.HandleLocationClick = function(self,pPrize){
	return function(event){
	    //alert('handling location');
	    //DebugOut(pPrize);
		panel['location'].Load(pPrize);
        return false;
	};
};

Prize.prototype.HandleMapClick = function(pPrize){
    alert('handling location');
    DebugOut(pPrize);
    panel['location'].Load(pPrize);
    return false;
};


Prize.prototype.InitMap = function(self){
    var latlng = new google.maps.LatLng(40.6687125,-73.5270709);
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: true,
      streetViewControl: false,
      disableDefaultUI: true
    };
    
    self.locmap = new google.maps.Map(document.getElementById("map"), myOptions);
    
    self.ClearMarkers(self);
    for( idx in self.locationdata.venues ){
        var value = self.locationdata.venues[idx];
        if( value.location.address !== undefined )
            self.PlaceMarker(self, value);
    }

};

Prize.prototype.ClearMarkers = function(self) {
    self.bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < self.markersArray.length; i++ ) {
        self.markersArray[i].setMap(null);
    }
};

Prize.prototype.PlaceMarker = function(self, pLoc){
    // Add map marker
    //give the marker a color
    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ff0000",
        new google.maps.Size(21, 84),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 34));
    var tmpMarker = new google.maps.Marker({
        map: self.locmap, 
        icon: pinImage,
        position: new google.maps.LatLng(pLoc.location.lat,pLoc.location.lng),
        title: pLoc.name,
        //locaddress: pLoc.locationAddress,
        //locdescription: pLoc.locationDescription,
        location: pLoc
    });
    
    self.markersArray.push(tmpMarker);
    
    self.bounds.extend(tmpMarker.getPosition());
    self.locmap.fitBounds(self.bounds);
    
    google.maps.event.addListener(tmpMarker, 'click', function(pLoc) {
        self.locmap.setCenter(this.position);
        //self.infowindow.setContent("<strong>"+this.title+"</strong><p>"+this.locaddress+"</p>"+"<p>"+this.locdescription+"</p>");
        //self.infowindow.open(self.locmap,this);
        panel['prize'].HandleMapClick(this.location);
    });
};

Prize.prototype.HideTabPanels = function()
{
	this.panel.elem.find('.tabpanel').hide();
};

Prize.prototype.Show = function(){
    
    this.panel.Show();
    return true;
};
