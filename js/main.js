
var countSpeed = 40;
var activeCanvas = "";
var canvasDeets = "";






function closeModal(){
	//DoAutopan();
	$('.container.modal').removeClass('loading').removeClass('showing').removeClass('shutter');
}

function loadCt(){
	$('.container.modal').addClass('loading');
	$('#loader .progress span').html(parseInt($('#loader .progress span').html())+1);
	if(parseInt($('#loader .progress span').html()) == 33){
		countSpeed = 600;
		loadDeet();
	}
	if(parseInt($('#loader .progress span').html()) == 72){
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
	$.get('http://api.greenzeta.com/gallery/detail/'+activeCanvas,function(result){
		$('#loader .progress span').html('53');
		countSpeed = 20;
		console.log(result);
		canvasDeets = result.data;
		$('#telescreen .title').html(canvasDeets.canvasName);
	});
}

function loadImage(){
	var lImg = new Image();
	lImg.onload = function(){
		console.log('imgload', $(this).attr('src'));
		$('#telescreen .vport').attr('src',$(this).attr('src'));
		countSpeed = 7;
	};
	lImg.src = 'http://api.greenzeta.com/uploads/'+canvasDeets.canvasImage;
}

$( document ).ready(function(){
	
	$.post('http://api.greenzeta.com/gallery/listing/',{app:'tpi'},function(result){
		console.log('listing',result);
		//<img src="http://api.greenzeta.com/uploads/t_<?php echo $row['canvasImage']; ?>" onclick="fly();"/>
		$.each(result.data, function(idx){
			
			var rowct = 6;
			
			if( idx >= (result.data.length)-(result.data.length%rowct)) return;
			
			
			var eol = 'none';
			if( idx%rowct == 0 ) eol = 'left';
			if(this.canvasDataStart == "NULL") this.canvasDataStart = "{}"
			$('#viewmaster').append(
				$('<img/>').attr('src','http://api.greenzeta.com/uploads/t_'+this.canvasImage)
					.attr('cId',this.canvasId)
					//.css('clear',eol)
					//.css('transform','rotateX('+(-((idx%rowct)))+'deg) rotateY('+(-((idx%rowct)*5))+'deg) rotateZ('+(-((idx%rowct)))+'deg)')
					//.css('transform-origin',(-((idx%rowct)*50))+'% '+(-(Math.floor(idx/rowct)*50))+'%')
					// .attr('zref',(idx%rowct))
					// .hover(function(pZ){
					// 	return function(){
					// 		$(this).css('transform','rotateX('+(-(pZ))+'deg) rotateY('+(-(pZ*5))+'deg) rotateZ('+(-(pZ))+'deg) translateZ(30px)');
					// 		//.css('transform-origin','0% 0%');
					// 	};
					// }(idx%rowct),function(pZ){
					// 	return function(){
					// 		$(this).css('transform','rotateX('+(-(pZ))+'deg) rotateY('+(-(pZ*5))+'deg) rotateZ('+(-(pZ))+'deg) translateZ(0px)');
					// 		//.css('transform-origin','0% 0%');
					// 	};
					// }(idx%rowct))
					.click(function(cdata){
						return function(){
							console.log(cdata);
							countSpeed = 40;
							$('#loader .progress span').html('20');
							$('#telescreen .title').html('');
							$('#telescreen .lat').html('');
							$('#telescreen .lng').html('');
							$('#telescreen .mh').html('');
							$('#telescreen .vport').attr('src','');
							activeCanvas = $(this).attr('cId');
							loadCt();
							//StopAutopan();
							//fly([cdata.longitude, cdata.latitude]);
						};
					}(JSON.parse(this.canvasDataStart)))
			);
			
			// Generate GEOJSON
			try{
				geodata.data.features.push({
					"type": "Feature",
					"geometry": {
						"type": "Point",
						"coordinates": [this.canvasLng, this.canvasLat]
					},
					"properties": {
						"title": "Mapbox DC",
						"marker-symbol": "monument"
					}
				});
			}catch(err){
				
			}
			
		});
	});
	
	$('.container.modal').click(function(){
		closeModal();
	});
	
	
});

