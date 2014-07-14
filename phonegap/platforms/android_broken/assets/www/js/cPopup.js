function Popup(pId){
    this.elem = $('#'+pId);
    
    //alert('panel created');
    //alert(this.elem.html());
}

Popup.prototype.Show = function(pProfileId){
    
    DebugOut('showing popup: '+this.elem.attr('id'));
    
    //$('.panel').css('z-index',1);
    $('.popup').hide();
    $('.messagebox').hide();
    //panel['sidemenu'].Hide();
    //this.elem.css('z-index',100);
    this.elem.show();
    
    if(gaPlugin){
    	gaPlugin.trackEvent( GASuccess, GAFail, "PopupShow", this.elem.attr('id'), "", 1);
    }else{
    	_gaq.push(['_trackEvent', 'PopupShow', this.elem.attr('id'), '']);
    }
    
    return true;
};

Popup.prototype.Hide = function(pProfileId){
    
    DebugOut('hiding popup: '+this.elem.attr('id'));
    
    this.elem.hide();
    
    return true;
};
