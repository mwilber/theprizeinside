function UserProfile(){
    
    this.panel = new Popup('userprofile');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnsave').click(this.DoProfileSave(this));

}


UserProfile.prototype.DoProfileSave = function(self){
	return function(){
		
		alert('FPO');
	};
};

UserProfile.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

UserProfile.prototype.Load = function(){
	
	if( lsUserId > 0 ){
	    
	    this.Show();  
	}else{
	    panel['userlogin'].Load();
	}
};


UserProfile.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
