function App(){
    
    this.panel = new Popup('app');
	
	this.panel.elem.find('.close').click(this.Close(this));
	

}

App.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

App.prototype.Load = function(){
	
	this.panel.elem.find('.location span').html(userLocation.lat()+", "+userLocation.lng());
    
    this.Show();  
};


App.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    $('#App .scroll-pane').jScrollPane(
        {
            showArrows: false,
            verticalGutter: 15
        }
    );
    
    return true;
};
