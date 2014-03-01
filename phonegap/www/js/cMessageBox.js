function MessageBox(pId){
    this.elem = $('#'+pId);
    
    //alert('panel created');
    //alert(this.elem.html());
}

MessageBox.prototype.Show = function(pProfileId){
    
    DebugOut('showing messagebox: '+this.elem.attr('id'));
    
    //$('.panel').css('z-index',1);
    $('.messagebox').hide();
    //panel['sidemenu'].Hide();
    //this.elem.css('z-index',100);
    this.elem.show();
    
    _gaq.push(['_trackEvent', 'MessageBoxShow', this.elem.attr('id'), '']);
    
    return true;
};

MessageBox.prototype.Hide = function(pProfileId){
    
    DebugOut('hiding messagebox: '+this.elem.attr('id'));
    
    this.elem.hide();
    
    return true;
};
