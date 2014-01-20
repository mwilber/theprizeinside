function Home(){
    
    this.panel = new Panel('home');
    
    this.panel.elem.find('.tourhome').click(
        function(){
            panel['tourhome'].Show();
            return false;
        }
    );
    
    this.panel.elem.find('.menusales').click(
        function(){
            panel['sidemenu'].Show();
            return false;
        }
    );
    
    this.panel.elem.find('.menutradeshow').click(
        function(){
            panel['sidemenu'].Show();
            return false;
        }
    );
}

Home.prototype.Show = function(){
    
    $('#header').show();
    
    this.panel.Show();
    
    return true;
};