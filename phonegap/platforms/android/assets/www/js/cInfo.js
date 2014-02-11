function Info(){
    
    this.panel = new Popup('info');
	
	this.panel.elem.find('.close').click(this.Close(this));
	

}

Info.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

Info.prototype.Load = function(){
	
	this.panel.elem.find('.location span').html(userLocation.lat()+", "+userLocation.lng());
    
    this.Show();  
};


Info.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
