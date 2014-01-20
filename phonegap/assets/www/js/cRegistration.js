function Registration(){
    
    this.panel = new Panel('registration');
    
    this.panel.elem.find('form').submit(this.HandleFormSubmit(this));
    
}

Registration.prototype.HandleFormSubmit = function(self){
    return function(event) {
            event.preventDefault();
            $.post(apipath+'/tinderbox/contact/add/json',self.panel.elem.find('form').serialize(),self.HandleRegData(this));
    };
};

Registration.prototype.HandleRegData = function(self){
    return function(response, textStatus) {
        DebugOut(response);
        //TODO: Handle errors here
        
        if( response.status == 1){
            //All good, store the user's reg status
            localStorage["registered"] = response.id;
            DebugOut('Local Storage reg set to: '+response.id);
            panel['home'].Show();
        }
        
    };
};

Registration.prototype.Show = function(pProfileId){
    
    this.panel.Show();
    
    return true;
};