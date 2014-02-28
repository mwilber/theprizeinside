function Prize(){
    
    this.panel = new Panel('prize');
    this.backId = "home";
    
    this.restaurantid = null;
    this.restaurantalias = null;
    this.prizeid = null;
    this.prizeName = "";
    this.locmap = null;
    this.bounds = new google.maps.LatLngBounds();
    this.markersArray = [];
    this.infowindow = new google.maps.InfoWindow({
        content: "this is a test"
    });
    this.locationdata = null;
    
    this.panel.elem.find('.back').click(this.Back(this));
    this.panel.elem.find('.showuserlocation').click(this.ShowUserLocation(this));
    this.panel.elem.find('.showcheckin').click(this.Checkin(this,null,null));
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

Prize.prototype.Checkin = function(self,pPrize,pLocation){
   return function(){
       panel['checkin'].Load(pPrize,pLocation);
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
       self.panel.elem.find('.tablocations').addClass('selected');
	   self.panel.elem.find('#locations').show();
       return false;
   };
};

Prize.prototype.ShowMap = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tabmap').addClass('selected');
	   self.panel.elem.find('#map').show();
	   if( !self.locmap ) self.InitMap(self); else self.PlaceVenueMarkers(self);
       return false;
   };
};

Prize.prototype.ShowComments = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tabcomments').addClass('selected');
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
    this.panel.elem.find('#prizephoto').attr('src','img/homebanner.jpg');
    this.restaurantid = null;
    
    // hide the tab panels
	this.HideTabPanels();
    
    
    // Get the restaurant id
    this.restaurantid = pPrize.restaurant.restaurantId;
    this.restaurantalias = pPrize.restaurant.restaurantAlias;
    try{
    	this.prizeid = pPrize.prizeId;
    	this.prizeName = pPrize.prizeName;
    	for( idx in pPrize.checkins ){
    		DebugOut("Checkin Photo: "+pPrize.checkins[idx].checkinPhoto);
    		if( pPrize.checkins[idx].checkinPhoto != "" ){
    			this.panel.elem.find('#prizephoto').attr('src',pPrize.checkins[idx].checkinPhoto);
    			$('#header.header img').attr('src',pPrize.checkins[idx].checkinPhoto);
    			break;
    		}
    	}
    }catch(e){
    	this.prizeid = 0;
    	//this.panel.elem.find('#prizephoto').attr('src','');
    }
    
    // Fill in the prize info

    this.panel.elem.find('.name').html(pPrize.prizeName);
    
    this.panel.elem.find('.showwebsite').attr('href',pPrize.restaurant.restaurantUrl);

    this.Show(); 
    
    DebugOut('Loading alias: '+this.restaurantalias);
    var patsy = this.HandleLocationData(this);
    patsy(fsdata[this.restaurantalias]);
    
    if( wallmap ) this.PlaceVenueMarkers(this);
    
    // Get the checkin comments
    this.LoadCheckinData();
};

Prize.prototype.LoadCheckinData = function(){
	this.panel.elem.find('#comments ul').empty().append($('<li/>').html('loading...'));
	$.get(apipath+'/reactor/srvlist/getcheckinsbyprize/'+this.prizeid,this.HandleCheckinData(this));
};

Prize.prototype.HandleCheckinData = function(self){
    return function(response) {
    	DebugOut("checkin data incoming...");
        DebugOut(response);
        
        self.panel.elem.find('.checkins').empty();
         for( idx in response.checkins ){
             var value = response.checkins[idx];
             self.panel.elem.find('.checkins').append($('<li>')
                 .append(
                     $('<div/>').addClass('details fa fa-caret-right')
                 )
                 .append(
                     $('<div/>').addClass('icon').append($('<img/>').attr('src',value.checkinPhoto))
                 )
                 .append(
                     $('<div/>').addClass('comment').html(value.checkinComment)
                 )
                 .click(self.HandleCheckinClick(self,value))
            ); 
         }
    };
};

Prize.prototype.HandleCheckinClick = function(self,pCheckin){
	return function(event){
		panel['checkindetail'].Load(pCheckin.checkinId);
        return false;
	};
};

Prize.prototype.HandleLocationData = function(self){
    return function(response) {
        DebugOut(response);
        
        self.locationdata = response.response;
        
		self.panel.elem.find('#locations').show();
		self.panel.elem.find('.tablocations').addClass('selected');
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
		 ////////////////////////////////////////////
	    // For Testing
	    ////////////////////////////////////////////
	    //panel['location'].Load(response.response.venues[1]);
	    ////////////////////////////////////////////
    };
};

Prize.prototype.HandleLocationClick = function(self,pPrize){
	return function(event){
	    DebugOut('HandleLocationClick');
	    DebugOut(pPrize.location);
	    if(wallmap){
	        var mapOffsetX = ($(window).width()*.25)-150;
	        var mapOffsetY = ($(window).height()*.1)+50;
	        self.locmap.setCenter(new google.maps.LatLng(pPrize.location.lat,pPrize.location.lng));
	        self.locmap.setZoom(17);
	        self.locmap.panBy(-mapOffsetX, -mapOffsetY);
	    }
		panel['locationoptions'].Load(pPrize);
        return false;
	};
};

Prize.prototype.HandleMapClick = function(pPrize){
	//alert('handling location');
    //DebugOut(pPrize);
    if(wallmap){
        var mapOffsetX = ($(window).width()*.25)-150;
        var mapOffsetY = ($(window).height()*.1)+50;
        this.locmap.setCenter(new google.maps.LatLng(pPrize.location.lat,pPrize.location.lng));
        this.locmap.setZoom(17);
        this.locmap.panBy(-mapOffsetX, -mapOffsetY);
    }
	panel['locationoptions'].Load(pPrize);
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
    
    self.PlaceVenueMarkers(self);

};

Prize.prototype.PlaceVenueMarkers = function(self) {
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
        new google.maps.Size(40, 120),
        new google.maps.Point(0,0),
        new google.maps.Point(20, 60));
    var tmpMarker = new google.maps.Marker({
        map: self.locmap, 
        //icon: pinImage,
        position: new google.maps.LatLng(pLoc.location.lat,pLoc.location.lng),
        title: pLoc.name,
        //locaddress: pLoc.locationAddress,
        //locdescription: pLoc.locationDescription,
        location: pLoc,
        optimized: false
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
	this.panel.elem.find('.tabs li').removeClass('selected');
};

Prize.prototype.Show = function(){
    
    this.panel.Show();
    
    DebugOut('name: '+ this.panel.elem.find('.name').height());
    DebugOut('tabs: '+ this.panel.elem.find('.tabs').height());
    DebugOut('header: '+ this.panel.elem.find('.header').height());
    
    var offsetheight =  this.panel.elem.find('.header').height()+this.panel.elem.find('.tabs').height()+this.panel.elem.find('.name').height()+(parseInt(this.panel.elem.find('.name').css('padding-top'))*2);
    
    if( $(window).width() > 600 ) offsetheight =  this.panel.elem.find('.tabs').height()+this.panel.elem.find('.name').height()+(parseInt(this.panel.elem.find('.name').css('padding-top'))*2);
    
    DebugOut('offsetheight: '+offsetheight);
    
    // Size the map to fit the panel
    this.panel.elem.find('.tabpanel').css('width',this.panel.elem.width()+"px");
    this.panel.elem.find('.tabpanel').css('height',(this.panel.elem.height()-offsetheight)+"px");
    
    return true;
};
