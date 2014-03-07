function height(){
	var altura = $(window).height() - $('header').outerHeight(true)-45;

	$('.colSmall,.colLarge').css('height',altura);

	$('.contentFloat').css('bottom',$('.content-foo').height());
}

function popUp(){
	$('#addFriends').on('click',binds.abrir);
}


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
		template='<div style="display:none" id="template_expand" class="wrapper-expanded">'+$('#template_expand').html()+'</div>';

	}
	var scroll=$(window).scrollTop();
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
	$('.wrapper').removeClass('is-card-selected');
	$(this).addClass('is-card-selected');
	insertar=(insertar*columnas);

	if(insertar>=cartas)
		$('.wrapper').eq(cartas-1).after(template);
	else
		$('.wrapper').eq(insertar).before(template);


	$('#template_expand').slideDown().find('.arrow').css('left',($(this).offset().left+$(this).width()/2)-20)
	.end().find('.exit').on('click',function(e){
		e.preventDefault();
		$('#template_expand').slideUp();
		$('.wrapper').removeClass('is-card-selected');
	});

	$('html,body').animate({scrollTop:scroll},500);
	muyPronto();


}


$(document).on('ready',ready);
$(document).on('ready',slide);

var binds = {
	card:function(){
		card.init();
	},
	abrir:function(e){
		e.preventDefault();

		$('body').append(
			'<div class="mascara"></div>'+
				'<div class="boxAdd">'+
					'<div class="invit">'+
						'<div class="headInvit">'+
							'<h2>Invitados</h2>'+
						'</div>'+
						'<div class="listI">'+
							'<a class="edit" href="#">Editar</a>'+
							'<ul class="headList">'+
								'<li>Maria</li>'+
								'<li>Carlos</li>'+
								'<li>Miguel</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="search">'+
						'<input type="text" placeholder="Ingresa tu busqueda">'+
					'</div>'+
					'<ul class="selectInvit">'+
						'<li>'+
							'<label>'+
								'<div class="box-img">'+
									'<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-prn1/t5/s48x48/50497_286090116575_1262794_q.jpg"></img>'+
								'</div>'+
								'<span class="name">Juliana Lizarra</span>'+
								'<input type="checkbox">'+
							'</label>'+
						'</li>'+
						'<li>'+
							'<label>'+
								'<div class="box-img">'+
									'<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/s48x48/1087018_160705070753108_939350680_q.jpg"></img>'+
								'</div>'+
								'<span class="name">Jeniffer Madison</span>'+
								'<input type="checkbox">'+
							'</label>'+
						'</li>'+
						'<li>'+
							'<label>'+
								'<div class="box-img">'+
									'<img src="http://pbs.twimg.com/profile_images/1795303807/spinetta-784314_normal.jpg"></img>'+
								'</div>'+
								'<span class="name">Daniel Guerra</span>'+
								'<input type="checkbox">'+
							'</label>'+
						'</li>'+
						'<li>'+
							'<label>'+
								'<div class="box-img">'+
									'<img src="https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash2/t5/s48x48/1086603_604037769674221_805703514_q.jpg"></img>'+
								'</div>'+
								'<span class="name">Bratt Pitt</span>'+
								'<input type="checkbox">'+
							'</label>'+
						'</li>'+
					'</ul>'+
					'<a href="#" class="invitar">Invitar</a>'+
					'<div id="close">X</div>'+
				'</div>'+
			''
			).find('.mascara').css('height',$(window).height());

			$('#close,.mascara').on('click',binds.cerrar);

	},

	cerrar:function(){
		$('.mascara,.boxAdd').fadeOut('slow',function(){$(this).remove();});
	}
}

var scroll = {
	dentro:function(){
		$('.colSmall').css('overflow-y','scroll');
	},
	fuera:function(){
		$('.colSmall').css('overflow-y','');
	}
}



var card={
	template:null,

	init:function(){

		$('.box-carta').on('click',card.viewOne);
		$('#viewAll').on('click',card.viewAll);
		$('#addCard').on('click',card.add);
		card.positions();

		//$('img').on('load',card.positionsAddCard);
		setTimeout(function(){
			card.positionsAddCard();
		},5000);
		$(window).on('resize',card.positionsAddCard);

	},

	positions:function(){
		$('.box-carta').each(function(i){

			var posTop=$(this).position().top+$('.contentFloat').scrollTop()+10;
			if(i==0) posTop-=10;

			$('.wrapper-new').eq(i).css({'top':posTop,'z-index':i});
		});

		$('.wrapper-new').off('mouseenter click',card.hover)
			.find('.exit').off('click',card.close);

		$('.wrapper-new').on('mouseenter click',card.hover)
			.find('.exit').on('click',card.close);
	},

	viewAll:function(){
		$('.addCard').hide();
		$('.wrapper-new').fadeIn();
	},

	closeAll:function(){
		$('.wrapper-new').fadeOut();
		$('.addCard').fadeIn();
	},

	viewOne:function(){
		var index=$('.box-carta').index(this);
		$('.addCard').hide();
		$('.wrapper-new').eq(index).fadeIn();
	},

	hover:function(){
		var zindex=parseInt($(this).css('z-index'));
		var zi=(zindex>=$('.wrapper-new').length)? zindex+1:$('.wrapper-new').length;
		$(this).css('z-index',zi);
	},

	close:function(){

		$(this).parent().fadeOut(function(){

			if(!$('.wrapper-new:visible').length)
				$('.addCard').fadeIn();
		});

	},

	add:function(){
		card.closeAll();
	},

	positionsAddCard:function(){
			card.block=$('.colCard > .addCard'),
			card._window=$('.contentFloat'),
			card.blockHeight=card.block.outerHeight(true),
			card._windowHeight=card._window.height();

			card._window.off('scroll',card._efecto);
			card._window.on('scroll',card._efecto);
	
	},

	_efecto:function(){
		if(card.block.is(':hidden'))
			return;

		var scroll 		=	$(this).scrollTop(),
			positionTop	=	scroll-((card._windowHeight-card.blockHeight)*-1);

		if((scroll+card._windowHeight)>card.blockHeight && card._windowHeight<card.blockHeight){
			card.block.css({
				'top':positionTop
			});
		}else if(card._windowHeight>card.blockHeight){
			card.block.css({
				'top':scroll
			});					
		}
	}



}



$(document).on('ready',popUp);
$(document).on('ready',binds.card);
$(window).on('load resize',height);

//Mask "Muy Pronto"
function muyPronto(){

	$('.add ul li > a,.box2 ul li > a').off('click',addLayer);
	$('.add ul li > a,.box2 ul li > a').on('click',addLayer);

}
function addLayer(e){
		e.preventDefault();

		$('body').append('<div class="muyPronto"><div class="mask"></div><div class="text">Muy Pronto</div></div>')
		.find('.muyPronto').fadeIn(700,function(){
			$(this).fadeOut(500,function(){
				$(this).remove();
			});
		});
}
$(document).on('ready',muyPronto);