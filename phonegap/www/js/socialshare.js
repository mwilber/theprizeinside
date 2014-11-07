/////////////////////////////////////////////////////////////////////////////
//  Social Share Popup Functions
/////////////////////////////////////////////////////////////////////////////

function fbshare(pTitle, pLink, pImage, pMessage){
    
    var fbcontent = "https://www.facebook.com/dialog/feed?app_id=314668331957423&link="+escape(pLink)+"&picture="+escape(pImage)+"&name="+escape(pTitle)+"&message="+escape(pMessage)+"&description="+escape(social['description'])+"&redirect_uri=https://facebook.com/";
    //openpopup(fbcontent,'facebook',1000,450);
    //navigator.app.loadUrl(url, { openExternal:true });
    window.open(fbcontent, '_system');
    //_gaq.push(['_trackEvent', 'Share', 'facebook', '']);
    return false;
}

function twshare(pTitle, pLink){
    //alert('error 201');
    //DebugOut('twshare');
    var twurl = "https://mobile.twitter.com/compose/tweet?status="+escape(pTitle)+escape(": ")+escape(pLink);
    //openpopup(twurl,'tweeters',550,450);
    //(url, { openExternal:true });
    //alert('error 201: '+twurl);
    window.open(twurl, '_system');
    //_gaq.push(['_trackEvent', 'Share', 'twitter', '']);
    return false;
}

function gpshare(pLink){
    var gpcontent = "https://plus.google.com/share?url="+escape(pLink)+"&description="+escape(social['description']);
    window.open(gpcontent, '_system');
    //openpopup(url,'gplus',550,450);
    //_gaq.push(['_trackEvent', 'Share', 'googleplus', '']);
    return false;
}

function pnshare(pTitle, pLink, pImage, pMessage){
    
    //var pncontent = "https://www.facebook.com/dialog/feed?app_id=653498184686265&link="+escape(pLink)+"&picture="+escape(pImage)+"&name="+escape(pTitle)+"&message="+escape(DEFAULT_COMMENT)+"&description="+escape(social['description'])+"&redirect_uri=https://facebook.com/";
    var pncontent = "https://pinterest.com/pin/create/button/?url="+escape(pLink)+"&media="+escape(pImage)+"&description="+escape(pMessage);
    //openpopup(fbcontent,'facebook',1000,450);
    //navigator.app.loadUrl(url, { openExternal:true });
    window.open(pncontent, '_system');
    //_gaq.push(['_trackEvent', 'Share', 'facebook', '']);
    return false;
}