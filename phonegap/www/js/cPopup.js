function Popup(pId){
    this.elem = $('#'+pId);
    
    //alert('panel created');
    //alert(this.elem.html());
}

Popup.prototype.Show = function(pProfileId){
    
    DebugOut('showing popup: '+this.elem.attr('id'));
    
    //$('.panel').css('z-index',1);
    $('.popup').hide();
    //panel['sidemenu'].Hide();
    //this.elem.css('z-index',100);
    this.elem.show();
    
    return true;
};

Popup.prototype.Hide = function(pProfileId){
    
    DebugOut('hiding popup: '+this.elem.attr('id'));
    
    this.elem.hide();
    
    return true;
};
