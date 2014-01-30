function Location(){
    
    this.panel = new Panel('location');
    this.backId = "prize";
    
    this.panel.elem.find('.back').click(this.Back(this));
	this.panel.elem.find('.showcheckin').click(this.Checkin(this));
	
}

Location.prototype.Back = function(self){
   return function(){
       panel[self.backId].Show();
       return false;
   };
};

Location.prototype.Checkin = function(self){
   return function(){
       panel['checkin'].Show();
       return false;
   };
};

Location.prototype.Load = function(pLocation){
    
    // Clear out panel fields
    this.panel.elem.find('.name').empty();
    this.panel.elem.find('#staticmap').attr('src','');
    
    //Make the static map url
    var mapurl = "http://maps.googleapis.com/maps/api/staticmap?zoom=13&size="+Math.floor(this.panel.elem.width()/2)+"x"+Math.floor(this.panel.elem.width()/2)+"&maptype=roadmap&markers=color:red%7Clabel:C%7C"+pLocation.location.lat+","+pLocation.location.lng+"&sensor=false";
    var streeturl = "http://maps.googleapis.com/maps/api/streetview?location="+pLocation.location.address+","+pLocation.location.postalCode+"&size="+this.panel.elem.width()+"x"+Math.floor(this.panel.elem.find('.header').height())+"&sensor=false";
    DebugOut('mapurl: '+mapurl);
    
    // Fill in the Location info
    this.panel.elem.find('.name').html(pLocation.name);
    this.panel.elem.find('.showdirections').attr('href', 'http://maps.google.com/?saddr='+userLocation.lat()+","+userLocation.lng()+'&daddr='+pLocation.location.address+","+pLocation.location.postalCode);
    this.panel.elem.find('#staticmap').attr('src',mapurl);
    this.panel.elem.find('#streetview').attr('src',streeturl);
    //this.panel.elem.find('.header').css('background',"transparent url('"+streeturl+"') center center repeat");
    
    DebugOut(pLocation);
    
    this.Show();  
};

Location.prototype.HandleLocationData = function(self){
    return function(response, textStatus) {
        DebugOut(response);
		self.panel.elem.find('#locations').show();
		self.panel.elem.find('#locations ul').empty();
        for( idx in response.response.venues ){
             var value = response.response.venues[idx];

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
		 
    };
};

Location.prototype.HandleLocationClick = function(self,pLocation){
	return function(event){
		//panel['Location'].Load(pLocation);
        return false;
	};
};

Location.prototype.Show = function(){
    
    this.panel.Show();
    return true;
};
