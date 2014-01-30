function Home(){
    
    this.panel = new Panel('home');
    
    //this.panel.elem.find('.tourhome').click(
    //    function(){
    //        panel['tourhome'].Show();
    //        return false;
    //    }
    //);
    
}

Home.prototype.Load = function(){
    
    DebugOut("Loading Home...");
    
    // Load panel data
    this.panel.elem.find('.prizes').empty().append($('<li/>').html('loading...'));
    //alert('ajax call tooo: '+apipath+'/tinderbox/city/json/all');
    
    // Simulate the ajax call for now
    var patsy = this.HandlePrizeData(this);
    DebugOut(prizedata);
    if( prizedata !== null ){
        DebugOut('prize data not null');
        patsy(prizedata);
        // Real ajax call --
        //                 |
        //                \/
        //$.get(apipath+'/reactor/srvlist/getnames',this.HandlePrizeData(this));
    
        this.Show();
    }else{
        DebugOut('setting timeout');
        setTimeout(function(){panel['home'].Load();},3000);
    }
};

Home.prototype.HandlePrizeData = function(self){
    return function(response, textStatus) {
    	DebugOut("prize data incoming...");
        DebugOut(response);
        
        //QueryLocation();
        
        self.panel.elem.find('.prizes').empty();
         for( idx in response ){
             var value = response[idx];
             var prizes = "";
             for(jdx in value.prize){
             	if( prizes != "" ) prizes += " / ";
             	prizes += value.prize[jdx].prizeName;
             }
             prizes += "&nbsp;";
             self.panel.elem.find('.prizes').append($('<li>')
                 .append(
                     $('<div/>').addClass('details fa fa-caret-right')
                 )
                 .append(
                     $('<div/>').addClass('icon fa fa-trophy').css('background-color','#'+value.restaurantColor)
                 )
                 .append(
                     $('<div/>').addClass('restaurant').html(value.restaurantName)
                 )
                 .append(
                     $('<div/>').addClass('prize').html(prizes)
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
