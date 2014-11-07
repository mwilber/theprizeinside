function Share(){
    
    this.panel = new MessageBox('share');
	
	this.panel.elem.find('.close').click(this.Close(this));
	
	this.panel.elem.find('#btnfacebook').click(this.DoShare(this,'fb'));
	this.panel.elem.find('#btntwitter').click(this.DoShare(this,'tw'));
	this.panel.elem.find('#btnpinterest').click(this.DoShare(this,'pn'));
	this.panel.elem.find('#btngoogle').click(this.DoShare(this,'gp'));
	
	this.ref = null;
	
	this.cloudLink = "";
    this.cloudName = "";
    this.cloudImage = "";
    this.cloudMessage = "";

}


Share.prototype.DoShare = function(self,pPlatform){
	return function(){
		var patsy = self.Close(self);
		switch(pPlatform){
			case 'fb':
			    fbshare(self.cloudName, self.cloudLink, self.cloudImage, self.cloudMessage);
			    patsy(self);
				break;
			case 'tw':
				twshare(self.cloudMessage, self.cloudLink);
				patsy(self);
				break;
			case 'pn':
			    pnshare(self.cloudName, self.cloudLink, self.cloudImage, self.cloudMessage);
			    patsy(self);
				break;
			case 'gp':
			    gpshare(self.cloudLink);
			    patsy(self);
				break;
		}

		//self.ref.addEventListener('loadstop', self.HandleAuthPopup(self));

	};
};

Share.prototype.Close = function(self){
   return function(){
       self.panel.Hide();
       return false;
   };
};

Share.prototype.Load = function(pName, pLink, pImage, pMessage){
    
    this.cloudName = pName;
    this.cloudLink = pLink;
    this.cloudImage = pImage;
    this.cloudMessage = pMessage;
    
    this.Show();  
};


Share.prototype.Show = function(){
    
    //$('#header').show();
    
    this.panel.Show();
    
    return true;
};
