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
       if(isMobile){
           panel['checkin'].Load(pPrize,pLocation);
       }else{
           panel['app'].Load();
       }
       
       return false;
   };
};

Prize.prototype.Back = function(self){
   return function(){
       panel[self.backId].Show();
       return false;
   };
};

Prize.prototype.Lightbox = function(self){
   return function(){
       $('#lightbox img').attr('src',self.panel.elem.find('.prizeimage img').attr('src'));
       $('#lightbox p').html(self.panel.elem.find('.prizecomment').html());
       $('#lightbox').fadeIn();
       return false;
   };
};

Prize.prototype.ShowLocations = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tablocations').addClass('selected');
	   self.panel.elem.find('#locations').show();
	   
		if(gaPlugin){
    		gaPlugin.trackEvent( GASuccess, GAFail, "Prize", "ShowLocations", "", 1);
		}else{
	    	_gaq.push(['_trackEvent', 'Prize', 'ShowLocations', '']);
	    }
       return false;
   };
};

Prize.prototype.ShowMap = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tabmap').addClass('selected');
	   self.panel.elem.find('#map').show();
	   if( !self.locmap ) self.InitMap(self); else self.PlaceVenueMarkers(self);
	   if(gaPlugin){
    		gaPlugin.trackEvent( GASuccess, GAFail, "Prize", "ShowMap", "", 1);
		}else{
	    	_gaq.push(['_trackEvent', 'Prize', 'ShowMap', '']);
	    }
       return false;
   };
};

Prize.prototype.ShowComments = function(self){
   return function(){
       self.HideTabPanels();
       self.panel.elem.find('.tabcomments').addClass('selected');
	   self.panel.elem.find('#comments').show();
	   SizePanels();
	   if(gaPlugin){
    		gaPlugin.trackEvent( GASuccess, GAFail, "Prize", "ShowComment", "", 1);
		}else{
	    	_gaq.push(['_trackEvent', 'Prize', 'ShowComment', '']);
	    }
       return false;
   };
};

Prize.prototype.Load = function(pPrize){
    
    try{
        ClearCheckinPops();
    }catch(exception){
        
    }
    
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
    			$('#header.header #homeview').attr('src',pPrize.checkins[idx].checkinPhoto);
    			break;
    		}
    	}
    }catch(e){
    	this.prizeid = 0;
    	//this.panel.elem.find('#prizephoto').attr('src','');
    }
    
    // Fill in the prize info

    this.panel.elem.find('.name').html(pPrize.prizeName);
    
    this.panel.elem.find('.showwebsite').click(function(){
    	window.open(pPrize.restaurant.restaurantUrl, '_system');
    });
    
    
    if(gaPlugin){
    	gaPlugin.trackEvent( GASuccess, GAFail, "Prize", this.restaurantalias, "", 1);
    }else{
    	_gaq.push(['_trackEvent', 'Prize', this.restaurantalias, '']);
    }

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
        
        if(!isMobile){
            self.panel.elem.find('.checkins').append($('<li>').addClass('appnoti')
                 .append(
                     $('<div/>').addClass('details fa fa-caret-right')
                 )
                 .append(
                     $('<div/>').addClass('comment').html("Get the app to share prizes and add your own comments")
                 )
                 .click(function(){panel['app'].Load();})
            );
        }
        
        if( response.checkins.length > 0 ){
             for( idx in response.checkins ){
                 var value = response.checkins[idx];
                 self.panel.elem.find('.checkins').append(
                     $('<li>')
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
        }else{
            self.panel.elem.find('#comments ul').empty().append($('<li/>').html('Tap on a location to add a comment.'));
        }
    };
};

Prize.prototype.HandleCheckinClick = function(self,pCheckin){
	return function(event){
		//panel['checkindetail'].Load(pCheckin.checkinId);
		// Load checkin data
		self.panel.elem.find('.detail').empty().append($('<li>').html('Loading...'));
		$.get(apipath+'/reactor/srvlist/getcheckindetail/'+pCheckin.checkinId,self.HandleCheckinDetail(self));
		//Show the panel
        self.panel.elem.find('.checkins').css('left','-100%');
        self.panel.elem.find('.detail').css('left','0%');
        return false;
	};
};

Prize.prototype.HandleCheckinDetailClose = function(self,pCheckin){
    return function(event){
        //Hide the panel
        self.panel.elem.find('.checkins').css('left','0%');
        self.panel.elem.find('.detail').css('left','100%');
        return false;
    };
};

Prize.prototype.HandleCheckinDetail = function(self,pCheckin){
    return function(response){
        
        self.panel.elem.find('.detail').empty();
        
        self.panel.elem.find('#comments .detail').append($('<li>')
             .append(
                 $('<div/>').addClass('details fa fa-caret-left')
             )
             .append(
                 $('<div/>').addClass('prizecomment').html(response.checkin.checkinComment)
             )
             .append(
                 $('<div/>').addClass('prizeimage').append($('<img/>').attr('src',response.checkin.checkinPhoto)).click(self.Lightbox(self))
             )
             
             .click(self.HandleCheckinDetailClose(self))
        );
        if( response.checkin.checkinLat != "" && response.checkin.checkinLng != "" && response.checkin.checkinLat != 0 && response.checkin.checkinLng != 0 ){
            var mapurl = "http://maps.googleapis.com/maps/api/staticmap?zoom=5&size="+Math.floor(self.panel.elem.width()*.7)+"x"+Math.floor((self.panel.elem.width()*.7)/2)+"&maptype=roadmap&markers=color:red%7Clabel:C%7C"+response.checkin.checkinLat+","+response.checkin.checkinLng+"&sensor=false";
            self.panel.elem.find('#comments .detail').append(
                $('<li>').addClass('location')
                //.append(
                 //    $('<div/>').addClass('address').html(value.location.address+", "+value.location.city+", "+value.location.state+" "+value.location.postalCode)
                 //)
                 .append(
                     $('<img/>').addClass('locationmap').attr('src',mapurl)
                 )
            );
        }
        
       
        var profilePic = response.profile.profilePicture;
        if( profilePic == undefined ){
            profilePic = "img/anonymous-user.png";
        }
        var profileName = response.profile.profileNickname;
        var countDisplay = "block";
        if( profileName == undefined ){
            profileName = "Anonymous";
            countDisplay = "none";
        }
        
        
        

        self.panel.elem.find('#comments .detail').append(
            $('<li>').addClass('profile')
             .append(
                 $('<img/>').addClass('avatar').attr('src',profilePic)
             )
             .append(
                 $('<div/>')
                    .css('float','left')
                    .append(
                        $('<h2/>').addClass('nickname').html(profileName)
                    )
                    .append(
                         $('<div/>')
                            .css('display',countDisplay)
                            .addClass('checkincount')
                            .append(
                                $('<span/>').addClass('number').html(response.profile.count)
                            )
                            .append('Prizes')
                     )
             )
        );
        
        SizePanels();
        
        return false;
    };
};

Prize.prototype.HandleLocationData = function(self){
    return function(response) {
    	
    	if( typeof(response) !== undefined ){
    	
        DebugOut(response);
        
        self.locationdata = response.response;
        
		self.panel.elem.find('#locations').show();
		self.panel.elem.find('.tablocations').addClass('selected');
		self.panel.elem.find('#locations ul').empty();
		
        for( idx in response.response.venues ){
            var value = response.response.venues[idx];
			
			if( value.location.address !== undefined ){
	            self.panel.elem.find('#locations ul').append($('<li>').append(
	            	$('<div class="ldet">')
	                 .append(
	                     $('<div/>').addClass('details fa fa-caret-right')
	                 )
	                 .append(
	                     $('<div/>').addClass('address').html(value.location.address)
	                 )
					 .append(
	                     $('<div/>').addClass('city').html(value.location.city+", "+value.location.state+" "+value.location.postalCode)
	                 )
	                 .click(self.HandleLocationSlide(self,value))
	            ).append(
	            	$('<div class="lopt">')
	                 .append(
	                     $('<div/>').addClass('simplistics fa fa-caret-left')
	                 )
	                 .append(
	                     $('<div/>')
	                     	.addClass('directions')
	                     	.addClass('fa')
	                     	.addClass('fa-road')
	                     	.html('')
	                     	.click(self.HandleDirections(self,value))
	                 )
	                 .append(
                         $('<div/>')
                            .addClass('directions')
                            .addClass('fa')
                            .addClass('fa-globe')
                            .html('')
                            .click(self.HandleWebsite(self,value))
                     )
					 .append(
	                     //$('<div/>').addClass('share').html(value.location.city+", "+value.location.state+" "+value.location.postalCode)
	                     $('<div/>')
	                     	.addClass('share')
	                     	.addClass('fa')
	                     	.addClass('fa-thumbs-up')
	                     	.html('')
	                     	.click(self.Checkin(self,null,value))
	                 )
	                 .click(self.HandleLocationSlide(self,value))
	            )
	            );
           	}
         }
		 ////////////////////////////////////////////
	    // For Testing
	    ////////////////////////////////////////////
	    //panel['location'].Load(response.response.venues[1]);
	    ////////////////////////////////////////////
	    }
    };
};

Prize.prototype.HandleWebsite = function(self,pLocation){
    return function(event){
        window.open(pLocation.url, '_system');
        _gaq.push(['_trackEvent', 'External', 'Restaurant Site', '']);
        return false;
    };
};

Prize.prototype.HandleDirections = function(self,pLocation){
	return function(event){
		//alert('http://maps.google.com/?saddr='+userLocation.lat()+','+userLocation.lng()+'&daddr='+pLocation.location.address+','+pLocation.location.postalCode);
    	var dirurl = 'http://maps.google.com/?saddr='+userLocation.lat()+','+userLocation.lng()+'&daddr='+escape(pLocation.location.address)+','+pLocation.location.postalCode;
    	
    	try{
        	if( device ){
        		if( device.platform == "iOS" ){
        			dirurl = 'http://maps.apple.com/?saddr='+userLocation.lat()+','+userLocation.lng()+'&daddr='+escape(pLocation.location.address)+','+pLocation.location.postalCode;
        		}
        	}
    	}catch(exception){
    	}
    	    	
    	//alert(dirurl);
    	
    	window.open(dirurl, '_system');
    	
    	_gaq.push(['_trackEvent', 'External', 'Driving Directions', '']);
    	return false;
	};
};

Prize.prototype.HandleLocationSlide = function(self,pPrize){
	return function(event){
	    DebugOut('HandleLocationSlide');
	    DebugOut(pPrize.location);
	    DebugOut(event);
	    if( $(event.delegateTarget).css('left') == '0%' || $(event.delegateTarget).css('left') == '0px' ){
	    	$(event.delegateTarget).css('left','-50%');
	    	$(event.delegateTarget).parent().find('.lopt').css('left','-50%');
	    }else{
	    	$(event.delegateTarget).css('left','0%');
	    	$(event.delegateTarget).parent().find('.ldet').css('left','0%');
	    }
        return false;
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
    
	$(window).trigger("resize");
    
    return true;
};
