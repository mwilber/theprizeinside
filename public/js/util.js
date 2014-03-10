function GASuccess(){DebugOut("GA Success!")}function GAFail(){DebugOut("GA Fail!")}Number.prototype.toRad=function(){return this*Math.PI/180};function roundNumber(a,b){var c=Math.pow(10,b);return Math.round(a*c)/c}function CalcDistance(a,b,c,e){var d=(roundNumber(a,7)-roundNumber(c,7)).toRad();b=(roundNumber(b,7)-roundNumber(e,7)).toRad();a=Math.sin(d/2)*Math.sin(d/2)+Math.cos(c.toRad())*Math.cos(a.toRad())*Math.sin(b/2)*Math.sin(b/2);return 12742*Math.atan2(Math.sqrt(a),Math.sqrt(1-a))}
function DoToggle(a){return function(a){DebugOut(a);"checkinAnonymous"==$(a.target).attr("id")?$(a.target).hasClass("fa-square-o")?($(a.target).removeClass("fa-square-o"),$(a.target).addClass("fa-check-square-o")):($(a.target).addClass("fa-square-o"),$(a.target).removeClass("fa-check-square-o")):$(a.target).toggleClass("selected")}}function supports_html5_storage(){try{return"localStorage"in window&&null!==window.localStorage}catch(a){return!1}}
function QueryLocation(){window.navigator.geolocation.getCurrentPosition(HandleGeolocationQuery,HandleGeolocationErrors,{enableHighAccuracy:!0,timeout:5E3,maximumAge:0})}
function HandleGeolocationQuery(a){DebugOut("Distance: "+CalcDistance(userLocation.lat(),userLocation.lng(),a.coords.latitude,a.coords.longitude));CalcDistance(userLocation.lat(),userLocation.lng(),a.coords.latitude,a.coords.longitude)>DISTANCE_CHANGE_REFRESH_THRESHOLD?(userLocation=new google.maps.LatLng(a.coords.latitude,a.coords.longitude),DebugOut("user location set: "+a.coords.latitude+", "+a.coords.longitude),panel.userlocation.Update(),wallmap&&wallmap.setCenter(userLocation),GetFSData()):
DebugOut("User Location Unchanged");for(idx in fsdata)for(jdx in fsdata[idx].response.venues){var b=fsdata[idx].response.venues[jdx];if(CalcDistance(a.coords.latitude,a.coords.longitude,b.location.lat,b.location.lng)<CHECKIN_NOTIFICATION_THRESHOLD&&b.location.lat!=autoCkLocation.lat()&&b.location.lng!=autoCkLocation.lng())for(kdx in DebugOut("Distance ("+b.name+"): "+CalcDistance(a.coords.latitude,a.coords.longitude,b.location.lat,b.location.lng)),autoCkLocation=new google.maps.LatLng(b.location.lat,
b.location.lng),DebugOut("Checking for: "+idx),prizedata)prizedata[kdx].restaurant.restaurantAlias==idx&&(panel.prize.Load(prizedata[kdx]),panel.checkin.Load(null,b))}$("#btngpssearch").show();$(".gpserror").hide()}function HandleGeolocationErrors(a){DebugOut("location error");HandleGeolocationQuery({coords:{latitude:40.67857830000001,longitude:-73.5421847}});$(".gpserror").show();panel.userlocation.Load();window.clearInterval(locationTimer)}
function fbshare(a,b){var c="https://www.facebook.com/dialog/feed?app_id=567792933313140&link="+escape(social.link)+"&picture="+escape(social.image)+"&name="+escape(a)+"&caption="+escape(a)+"&description="+escape(b)+"&redirect_uri=https://facebook.com/";window.open(c,"_system");return!1}function twshare(a){a="https://mobile.twitter.com/compose/tweet?status="+escape(a)+escape(": ")+escape(social.link);window.open(a,"_system");return!1}
function gpshare(){var a="https://plus.google.com/share?url="+escape(social.link)+"&description="+escape(social.description)+" "+escape(social.link);openpopup(a,"gplus",550,450);return!1}$.fn.doesExist=function(){return 0<jQuery(this).length};$.getRelativeTime=function(a){var b=Math.floor(a/86400);a-=86400*b;if(0<b)return 1==b?"Yesterday":b+" days ago";b=Math.floor(a/3600);if(0<b)return b+" hour"+(1<b?"s":"")+" ago";b=Math.floor((a-3600*b)/60);return 0<b?b+" minute"+(1<b?"s":"")+" ago":"Just now"};
$.fn.toRelativeTime=function(){var a=$(this),b=Math.round(Date.parse(a.text())/1E3);b&&a.text($.getRelativeTime(Math.round((new Date).getTime()/1E3)-b))};$.toRelativeTime=function(a){$(a).each(function(){$(this).toRelativeTime()})};function getRelativeTime(a){var b=Math.floor(a/86400);a-=86400*b;if(0<b)return 1==b?"Yesterday":b+" days ago";b=Math.floor(a/3600);if(0<b)return b+" hour"+(1<b?"s":"")+" ago";b=Math.floor((a-3600*b)/60);return 0<b?b+" minute"+(1<b?"s":"")+" ago":"Just now"}
function ConvertTimeStamp(a){a=a.split(/[- :]/);return new Date(a[0],a[1]-1,a[2],a[3],a[4],a[5])}function ReplaceURLWithHTMLLinks(a){return a.replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,"<a href='$1' target='_blank'>$1</a>")}function DebugOut(a){}
function openpopup(a,b,c,e){var d;d="toolbar=0,location=0,height="+e+",width="+c;var f,g;"Microsoft Internet Explorer"==navigator.appName?(g=screen.height,f=screen.width):(g=window.outerHeight,f=window.outerWidth);leftvar=(f-c)/2;rightvar=(g-e)/2;"Microsoft Internet Explorer"==navigator.appName?(c=leftvar,e=rightvar):(c=leftvar-pageXOffset,e=rightvar-pageYOffset);d=d+",left="+c;d=d+",top="+e;window.open(a,b,d)};