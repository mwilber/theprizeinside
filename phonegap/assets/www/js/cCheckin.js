function Checkin(){
    
    this.panel = new Popup('checkin');
	
	this.panel.elem.find('.close').click(this.Close(this));
    
    //this.panel.elem.find('.tourhome').click(
    //    function(){
    //        panel['tourhome'].Show();
    //        return false;
    //    }
    //);
    
}

Checkin.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

Checkin.prototype.Load = function(){
    
    // Load panel data
    //this.panel.elem.find('.prizes').empty().append($('<li/>').html('loading...'));
    //alert('ajax call tooo: '+apipath+'/tinderbox/city/json/all');
    
    // Simulate the ajax call for now
    //var patsy = this.HandlePrizeData(this);
    //patsy(prizedata);
    // Real ajax call --
    //                 |
    //                \/
    //$.get(apipath+'/reactor/speaker/json/event/'+pId+'/speaker',this.HandlePrizeData(this));
    
    this.Show();  
};


Checkin.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
