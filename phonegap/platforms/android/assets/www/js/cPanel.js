function Panel(pId){
    this.elem = $('#'+pId);
    
    //alert('panel created');
    //alert(this.elem.html());
}

Panel.prototype.Show = function(pProfileId){
    
    DebugOut('showing panel: '+this.elem.attr('id'));
    
    //$('.panel').css('z-index',1);
    $('.panel').hide();
    $('.popup').hide();
    $('.messagebox').hide();
    //panel['sidemenu'].Hide();
    //this.elem.css('z-index',100);
    this.elem.show();
    
    if(gaPlugin){
    	gaPlugin.trackEvent( GASuccess, GAFail, "PanelShow", this.elem.attr('id'), "", 1);
    }else{
    	_gaq.push(['_trackEvent', 'PanelShow', this.elem.attr('id'), '']);
    }
    
    return true;
};
