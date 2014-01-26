function Prize(){
    
    this.panel = new Panel('prize');
    this.backId = "home";
    
    this.panel.elem.find('.back').click(this.Back(this));
	this.panel.elem.find('.showcheckin').click(this.Checkin(this));
	this.panel.elem.find('#btnlocations').click(this.ShowLocations(this));
	this.panel.elem.find('#btnmap').click(this.ShowMap(this));
	this.panel.elem.find('#btncomments').click(this.ShowComments(this));
	
}

Prize.prototype.Back = function(self){
   return function(){
       panel[self.backId].Show();
       return false;
   };
};

Prize.prototype.Checkin = function(self){
   return function(){
       panel['checkin'].Show();
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
	
	// hide the tab panels
	this.HideTabPanels();
    
    // Clear out panel fields
    this.panel.elem.find('#locations ul').empty().append($('<li/>').html('loading...'));
	this.panel.elem.find('#comments ul').empty().append($('<li/>').html('loading...'));
    this.panel.elem.find('.name').empty();
    
    // Fill in the prize info
    var prizes = "";
             for(jdx in pPrize.prize){
             	if( prizes != "" ) prizes += " / ";
             	prizes += pPrize.prize[jdx].prizeName;
             }
    this.panel.elem.find('.name').html(prizes);

    // Simulate the ajax call for now
    DebugOut('Loading locations: '+pPrize.restaurantAlias);
    var patsy = this.HandleLocationData(this);
    patsy(fsdata[pPrize.restaurantAlias]);
    // Real ajax call --
    //                 |
    //                \/
    //$.get(apipath+'/reactor/speaker/json/id/'+pId,this.HandlePrizeData(this));
    
    this.Show();  
};

Prize.prototype.HandleLocationData = function(self){
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

Prize.prototype.HandleLocationClick = function(self,pPrize){
	return function(event){
		//panel['prize'].Load(pPrize);
        return false;
	};
};

Prize.prototype.HideTabPanels = function()
{
	this.panel.elem.find('.tabpanel').hide();
};

Prize.prototype.Show = function(){
    
    this.panel.Show();
    return true;
};
