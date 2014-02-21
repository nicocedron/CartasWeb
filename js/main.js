$(document).on('ready',popUp);

function popUp(){

	$('#addFriends').on('click',binds.abrir);
	$('#close').on('click',binds.cerrar);
}

/*$(document).on('ready',function(){
	IncrementBlocks();
	Block();
	$(window).on('resize',Block);
	$('img').on('load',Block);
});


function Block(){

	$('#content').BlocksIt({
		numOfCol: Math.round($('#content').width()/294),
		offsetX: 8,
		offsetY: 8
	});

}

//Simulate Blocks
function IncrementBlocks(){
	var content=$('#content').html();
	$('#content').append(content);
	$('#content').append(content);
	$('#content').append(content);
}
*/

function slide(){

	var $curr = $(".boxSlide:first");
	$curr.fadeIn();

  $('#next').on('click',function(){
    if($curr.next('.boxSlide').html()==undefined)
      return;

    $curr = $curr.next('.boxSlide');
    $( ".boxSlide" ).fadeOut();
  	$curr.fadeIn();
  });

  $('#prev').on('click',function(){
        if($curr.prev('.boxSlide').html()==undefined)
      return;

    $curr = $curr.prev('.boxSlide');
    $( ".boxSlide" ).fadeOut();
  $curr.fadeIn();
  });

}


var template=null;
function ready(){
	$('.wrapper').on('click',carta_expand);
}

function carta_expand(){

	if(template==null){
		template='</section></section><div style="display:none" id="template_expand" class="wrapper-expanded">'+$('#template_expand').html()+'</div><section id="container"><section id="content">';
		
	}
	if($('#template_expand').length)
		$('#template_expand').remove();

	var pantalla=$('#content').width();
	var columnas=parseInt(pantalla/$('.wrapper:eq(0)').outerWidth(true));
	var cartas=($('.wrapper').length);
	var filas=Math.ceil(cartas/columnas);
	var carta=$('.wrapper').index(this);
	var insertar=1;

	for(i=1;i<cartas;i++){
		var cond=insertar*columnas;

		if(i>cond)
			insertar++;

		if(i==(carta+1))
			break;
		
	}

	$(this).addClass('is-card-selected');
	insertar=(insertar*columnas);

	if(insertar>=cartas)
		$('.wrapper').eq(cartas-1).after(template);
	else
		$('.wrapper').eq(insertar).before(template);


$('#template_expand').slideDown();

}



var binds = {

	abrir:function(e){
		e.preventDefault;

		$('body').append($(
			'<div class="mascara">'+
			'<div class="boxAdd"><div id="close">X</div></div>'+
			'</div>'
			)).find('.mascara').css('height',$(window).height());

	},

	cerrar:function(){
		$('.mascara').remove();
	}
}

$(document).on('ready',ready);
$(document).on('ready',slide);



