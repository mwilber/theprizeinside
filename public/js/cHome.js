function Home(){
    
    this.panel = new Panel('home');
    
    this.panel.elem.find('.showuserprofile').click(this.ShowUserProfile(this));
    this.panel.elem.find('.showinfo').click(this.ShowInfo(this));
    
}

Home.prototype.ShowUserProfile = function(self){
   return function(){
       panel['userprofile'].Load();
       return false;
   };
};

Home.prototype.ShowInfo = function(self){
   return function(){
       panel['info'].Load();
       return false;
   };
};

Home.prototype.Load = function(){
    
    DebugOut("Loading Home...");
    
    // Load panel data
    this.panel.elem.find('.prizes').empty().append($('<li/>').html('loading...'));
    //alert('ajax call tooo: '+apipath+'/tinderbox/city/json/all');
    
    // Simulate the ajax call for now
    //var patsy = this.HandlePrizeData(this);
    //patsy(prizedata);
    // Real ajax call --
    //                 |
    //                \/
    $.get(apipath+'/reactor/srvlist/getprizes',this.HandlePrizeData(this));

    this.Show();
};

Home.prototype.HandlePrizeData = function(self){
    return function(response, textStatus) {
    	DebugOut("prize data incoming...");
        DebugOut(response);
        
        prizedata = response;
        QueryLocation();
        locationTimer = window.setInterval(QueryLocation,LOCATION_CK_INTERVAL);
        
        self.panel.elem.find('.prizes').empty();
         for( idx in response ){
             var value = response[idx];
             //var prizes = "";
             //for(jdx in value.prize){
             //	if( prizes != "" ) prizes += " / ";
             //	prizes += value.prize[jdx].prizeName;
             //}
             //prizes += "&nbsp;";
             self.panel.elem.find('.prizes').append($('<li>')
                 .append(
                     $('<div/>').addClass('details fa fa-caret-right')
                 )
                 .append(
                     $('<div/>').addClass('icon fa fa-trophy').css('background-color','#'+value.restaurant.restaurantColor)
                 )
                 .append(
                     $('<div/>').addClass('restaurant').html(value.restaurant.restaurantName)
                 )
                 .append(
                     $('<div/>').addClass('prize').html(value.prizeName)
                 )
                 .click(self.HandlePrizeClick(self,value))
            ); 
         }
         ////////////////////////////////////////////
	    // For Testing
	    ////////////////////////////////////////////
	    //panel['prize'].Load(response[1]);
	    ////////////////////////////////////////////
	    
	    // Call show() again to make sure everything is sized right
	    //self.Show();
    };
};

Home.prototype.HandlePrizeClick = function(self,pPrize){
	return function(event){
		panel['prize'].Load(pPrize);
        return false;
	};
};

Home.prototype.Show = function(){
	
	$('#header.header #homeview').attr('src','img/homebanner.jpg');
	
	this.panel.Show();
    if( supports_html5_storage() ){
        if(localStorage["firstrun"] == undefined){
            localStorage["firstrun"] = true;
            panel['info'].Show();
        }
    }
    
    //$('#header').show();
    
    $(window).trigger("resize");
    if( wallmap ){
    	panel['prize'].ClearMarkers(panel['prize']);
    	GetCheckinPops();
    }
    
    
    return true;
};
