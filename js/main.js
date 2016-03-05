
var countSpeed = 40;
var activeCanvas = "";
var canvasDeets = "";

//{"tpi":{"prizeName":"Mac Tonight","restaurantName":"McDonalds"},"location":{"latitude":38.018853,"longitude":-77.501441,"altitude":null,"accuracy":40.5,"altitudeAccuracy":null,"heading":null,"speed":null,"timestamp":1455040693814,"magneticHeading":0}}
//{"tpi":{"prizeName":"Valentine's Day Books","restaurantName":"McDonalds"},"location":{"latitude":38.018853,"longitude":-77.501441,"altitude":null,"accuracy":40.5,"altitudeAccuracy":null,"heading":null,"speed":null,"timestamp":1455040693814,"magneticHeading":0}}


function ckHeight(){
	if($(window).height() > $(window).width()){
		$('body').addClass('tall');
	}else{
		$('body').removeClass('tall');
	}
}

function closeModal(){
	//DoAutopan();
	$('.container.modal').removeClass('loading').removeClass('showing').removeClass('shutter');
	return false;
}

function loadCt(){
	$('.container.modal').addClass('loading');
	$('#loader .progress span').html(parseInt($('#loader .progress span').html())+1);
	if(parseInt($('#loader .progress span').html()) == 76){
		countSpeed = 600;
		loadDeet();
	}
	if(parseInt($('#loader .progress span').html()) == 92){
		countSpeed = 600;
		if(canvasDeets.canvasImage){
			loadImage();
		}
	}
	if(parseInt($('#loader .progress span').html()) < 100){
		setTimeout(loadCt, countSpeed);
	}else{
		$('.container.modal').addClass('showing');
	}
}

function loadDeet(){
	$.get('https://api.greenzeta.com/gallery/detail/'+activeCanvas,function(result){
		$('#loader .progress span').html('83');
		countSpeed = 20;
		console.log(result);
		canvasDeets = result.data;
		var moreDeets = JSON.parse(canvasDeets.canvasDataStart);
		console.log('moreDeets', moreDeets);
		$('.modal #title h1').html(canvasDeets.canvasName);
		$('.modal #title h2 span').html(canvasDeets.profileUsername);
		$('#deets .prize').html(moreDeets.tpi.prizeName);
		$('#deets .restaurant').html(moreDeets.tpi.restaurantName);
		
		$('#btnfacebook').click(DoShare('fb', canvasDeets));
		$('#btntwitter').click(DoShare('tw', canvasDeets));
		$('#btnpinterest').click(DoShare('pn', canvasDeets));
		$('#btngoogle').click(DoShare('gp', canvasDeets));
	});
}

function loadImage(){
	var lImg = new Image();
	lImg.onload = function(){
		console.log('imgload', $(this).attr('src'));
		$('#telescreen .vport').attr('src',$(this).attr('src'));
		countSpeed = 7;
	};
	lImg.src = 'https://api.greenzeta.com/uploads/'+canvasDeets.canvasImage;
}

function showCanvas(pId){
	//console.log(cdata);
	countSpeed = 40;
	$('#loader .progress span').html('55');
	$('#telescreen .title').html('');
	$('#telescreen .lat').html('');
	$('#telescreen .lng').html('');
	$('#telescreen .mh').html('');
	$('#telescreen .vport').attr('src','');
	$('#deets .prize').html('');
	$('#deets .restaurant').html('');
	
	$('#btnfacebook').click(null);
	$('#btntwitter').click(null);
	$('#btnpinterest').click(null);
	$('#btngoogle').click(null);
	
	activeCanvas = pId;
	loadCt();
	return false;
	//StopAutopan();
	//fly([cdata.longitude, cdata.latitude]);
}

function DoShare(pPlatform, pDeets){
	return function(){
		console.log(pDeets);
		switch(pPlatform){
			case 'fb':
			    fbshare(pDeets.canvasName, pDeets.shareUrl, pDeets.shareImage, social['description']);
				break;
			case 'tw':
				twshare(pDeets.canvasName, pDeets.shareUrl, social['message']);
				break;
			case 'pn':
			    pnshare(pDeets.canvasName, pDeets.shareUrl, pDeets.shareImage, pDeets.canvasName+" - "+social['description']);
				break;
			case 'gp':
			    gpshare(pDeets.shareUrl);
				break;
		}
		return false;
	};
}

function BuildGallery(pTag, pOffset){
	
	var qo = {app:'tpi'};
	if(pTag){
		qo.tag = pTag;
	}
	
	pOffset++;
	
	$.post('https://api.greenzeta.com/gallery/listing/'+pOffset,qo,function(pPassset){
		return function(result){
			//console.log('listing',result);
			console.log("offset", pPassset);
			//<img src="https://api.greenzeta.com/uploads/t_<?php echo $row['canvasImage']; ?>" onclick="fly();"/>
			//for( var idx=0; idx < 3; idx++){
			$.each(result.data, function(idx){
				$('#viewmaster').append($('<div>').append(
					$('<img/>').attr('src','https://api.greenzeta.com/uploads/t_'+this.canvasImage)
						.attr('cId',this.canvasId)
						.click(function(){
							showCanvas($(this).attr('cId'));
						})
				));
			});
			$('#viewmaster').css('height','')
			setTimeout(function(pTOffset){
				return function(){
				//console.log(pTOffset,$(window).height(),$('#maincontainer').height(),result.data);
				if( ($('#maincontainer').height() < $(window).height()) && result.data.length >= 30 ){
					BuildGallery(pTag, pTOffset);
				}
				};
			}(pPassset),500);
		
		};
	}(pOffset));
}


$( document ).ready(function(){
	
	ckHeight();
	
	$(window).on('resize',function(){ckHeight();});
	
	$.post('https://api.greenzeta.com/tpi/prizes/',{},function(result){
		console.log('prizes',result);
		$.each(result.data, function(){
			$('.prizes').append($('<li>').append($('<a>')
				.attr('href','#').append(
					$('<span>')
						.addClass('restaurant')
						.html(this.restaurant.restaurantName)
				)/*.append(
					$('<br>')
				)*/.append(
					$('<span>')
						.addClass('prize')
						.html(this.prizeName)
				).click(function(pAlias){
					return function(){
						
						if( $(this).hasClass('selected')){
							$('.prizes a').removeClass('selected');
							$('#viewmaster').css('height',$('#viewmaster').height()+'px').empty();
							BuildGallery(false,-1);
						}else{
							$('.prizes a').removeClass('selected');
							$(this).addClass('selected');
							$('#viewmaster').css('height',$('#viewmaster').height()+'px').empty();
							BuildGallery(pAlias,-1);
						}
						return false;
					};
				}(this.restaurant.restaurantAlias))
				
			));
		});
	});
	
	$('#viewmaster').empty();
	BuildGallery(false, -1);
	
	$('.container.modal .fa-close').click(function(){
		closeModal();
		return false;
	});
	
	window.onscroll = function(ev) {
		//console.log( "("+window.innerHeight+" + "+window.scrollY+") >= "+$('#maincontainer').height() );
		if ((window.innerHeight + window.scrollY) >= $('#maincontainer').height()) {
			console.log("rock bottom", $('#viewmaster div').length, Math.floor($('#viewmaster div').length/30));
			if($('#viewmaster div').length%30 == 0){
				BuildGallery(false, Math.floor($('#viewmaster div').length/30)-1);
			}
		}
	};
	
	
});

