function Prize(){
    
    this.panel = new Panel('prize');
    this.backId = "home";
    
    this.panel.elem.find('.back').click(this.Back(this));
}

Prize.prototype.Back = function(self){
   return function(){
       panel[self.backId].Show();
       return false;
   };
};

Prize.prototype.Load = function(pPrize){
    
    // Clear out panel fields
    this.panel.elem.find('.locations').empty().append($('<li/>').html('loading...'));
    this.panel.elem.find('.name').empty();
    
    // Fill in the prize info
    // TODO: Test aide error reporting
    //self.panel.elem.find('.name').html(pPrize.restaurantName);
    //var prizes = "";
    //         for(jdx in value.prize){
    //         	if( prizes != "" ) prizes += " / ";
    //         	prizes += value.prize[jdx].prizeName;
    //         }
    this.panel.elem.find('.name').html(pPrize.restaurantName);

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
        for( idx in response.response.venues ){
             var value = response.response.venues[idx];

             self.panel.elem.find('.locations').append($('<li>')
                 .append(
                     $('<div/>').addClass('details fa fa-caret-right')
                 )
                 .append(
                     $('<div/>').addClass('address').html(value.location.address)
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

Prize.prototype.Show = function(){
    
    this.panel.Show();
    return true;
};