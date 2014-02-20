function CheckinDetail(){
    
    this.panel = new Popup('checkindetail');
	
	this.panel.elem.find('.close').click(this.Close(this));
	

}

CheckinDetail.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

CheckinDetail.prototype.Load = function(){
	
	
    
    this.Show();  
};


CheckinDetail.prototype.Show = function(){
    this.panel.elem.show();
    return true;
};
