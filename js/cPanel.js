function Panel(a){this.elem=$("#"+a)}Panel.prototype.Show=function(a){DebugOut("showing panel: "+this.elem.attr("id"));$(".panel").hide();$(".popup").hide();$(".messagebox").hide();this.elem.show();gaPlugin?gaPlugin.trackEvent(GASuccess,GAFail,"PanelShow",this.elem.attr("id"),"",1):_gaq.push(["_trackEvent","PanelShow",this.elem.attr("id"),""]);return!0};