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
    
    var offsetheight =  this.panel.elem.find('.header').height()+this.panel.elem.find('.name').height()+(parseInt(this.panel.elem.find('.name').css('padding-top'))*4);
    this.panel.elem.find('.content').css('height',(this.panel.elem.height()-offsetheight)+"px");
    
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
    };
};

Home.prototype.HandlePrizeClick = function(self,pPrize){
	return function(event){
		panel['prize'].Load(pPrize);
        return false;
	};
};

Home.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
