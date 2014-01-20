function Panel(pId){
    this.elem = $('#'+pId);
    
    //alert('panel created');
    //alert(this.elem.html());
}

Panel.prototype.Show = function(pProfileId){
    
    DebugOut('showing panel: '+this.elem.attr('id'));
    
    //$('.panel').css('z-index',1);
    $('.panel').hide();
    //panel['sidemenu'].Hide();
    //this.elem.css('z-index',100);
    this.elem.show();
    
    return true;
};
