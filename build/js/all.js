var SimulateTouch=true;





var card={
	open:true,
	universal:function(){
		$('.header .left .logo').hide();
		$('.header .left .back').show()
			.one('click',back)
			.one('click',function(){

				history.back(1);
			});

		resetPage(0);

	},
	show:function(){

		if(!card.open)
			return;
		
		location.href="card.html"


	},

	invite:function(){

		$('.cardInvite,.subheader,.Invite').show();
		$('.subheader').css('height',80);
		$('.swiper-pages').css('top','125px');

		$('.footer .Card .btn').hide();
		$('.footer .Invite .js-invite').show();

		$('.subheader .Invite .js-edit').on('click',function(){
			if($(this).hasClass('gray'))
				return $('.js-search').trigger('click'); 

			$(this).addClass('gray');
			$('.swiper-pages').css('bottom',94);

			$('.footer .Invite .js-search').show().one('click',function(){
				$('ul.selectInvit li').show();

				$('.swiper-pages').css('bottom',50);
				$('.subheader .Invite .js-edit').removeClass('gray');
				$(this).hide();

			});

			$('ul.selectInvit li input:not(:checked)').parent().parent().hide();
		});



		resetPage(0);


	}

};

function resetPage(key){
		PAGE[key].reInit();
		PAGE[key].resizeFix();
		PAGE[key].setWrapperTranslate(0,0);
}
function back(){
		$('.header .left .logo').show();
		$('.header .left .back').hide();
}

function home(){

	$('ul.chat li').on('click',function(){
		location.href="chat.html"
	});
	
	pages = $('.swiper-pages').swiper({
		resistance:'100%',
		simulateTouch:SimulateTouch,
		onTouchMove:function(){
			card.open=false;
		},		
		onTouchEnd:function(){
			setTimeout(function(){card.open=true;},500);
		},
		onSlideChangeStart:function(slide){
			var active=slide.activeIndex;
			$('ul.nav li').removeClass('active').eq(active).addClass('active');

			$('.subheader > div:visible').stop().hide(0,function(){
				$(this).removeClass('active');
				$('.subheader > div').css('display','none').eq(active).stop().show();
			});

			if(active==0) location.hash="descubre";
			else if(active==1) location.hash="comparte";
			else if(active==2) location.hash="colecciona";
			

		},
		onFirstInit:function(){
			setTimeout(function(){
				$(location.hash).trigger('click');
			},100);
		}

	});

	//Scroll Containers
	PAGE=[];
	$('.scroll-container').each(function(i){
		
		PAGE[i]= $(this).swiper({
			mode:'vertical',
			resistance:'100%',
			simulateTouch:SimulateTouch,
			scrollContainer: true,
			mousewheelControl: true,
			onTouchMove:function(){
				card.open=false;
			},
			onTouchEnd:function(){
				setTimeout(function(){card.open=true;},500);
			},			
			scrollbar: {
				container:$(this).find('.swiper-scrollbar')[0]
			}
		});
	});

	$('ul.nav li').on('click',function(){
		var index=$('ul.nav li').index(this);

		pages.swipeTo(index);


	});

	$('.filter').on('click',function(){
		$('.filter ul').stop().slideToggle('slow');
	});


	$('div.search.icon-filter').on('click',function(){
		$('#comparteList').toggle();
		$('.filterPage').toggle();
		
		resetPage(0);
	});

	$('.card .image, .card .title,.card .tag,.card .address').on('click',card.show);
	$('.card .share').on('click',to.add);
	
	
	$('.filterPage a').on('click',function(e){
		e.preventDefault();
		$('div.search.icon-filter').trigger('click');

	});



}
$(document).on('ready',function(){
	$('.header .right .icon').on('click',function(){
		$('.header .right .menu').toggle();
		$(this).toggleClass('active');
	});


	$('.menu a').on('click',function(){
		setTimeout(function(){
			$(location.hash).trigger('click');
			$('.header .right .menu').toggle();
			$('.header .right .icon').removeClass('active');
		},10);
	});
});

function chat(){

		$('.footer > div').hide().eq(0).show();
		$('.swiper-pages').css('top',90).css('bottom',50);

		$('.Card .btn,.cards .share').on('click',function(){
			location.href="agregar.html";
		});

		pages = $('.swiper-pages').swiper({
		resistance:'100%',
		simulateTouch:SimulateTouch,
		onTouchMove:function(){
			card.open=false;
		},		
		onTouchEnd:function(){
			setTimeout(function(){card.open=true;},500);
		},
		onSlideChangeStart:function(slide){
			var active=slide.activeIndex;
			$('ul.nav li').removeClass('active').eq(active).addClass('active');
			$('.page3').hide();
			$('.swiper-pages').css('bottom','').css('top','');

			if(active!=1){
				$('.footer > div').hide().eq(active).show();
				$('.swiper-pages').css('bottom',50).css('top','');

				if(active==2){
					$('.page3').slideDown();
					$('.swiper-pages').css('top',123);

				}

			}else{
				$('.footer > div').hide();
				slide.reInit();
			}

			$('.footer .boxIcons').hide();

			$('.chatPages ul li').removeClass('active').eq(active).addClass('active');

		}

	});

	//Scroll Containers
	PAGE=[];
	$('.scroll-container').each(function(i){
		
		PAGE[i]= $(this).swiper({
			mode:'vertical',
			simulateTouch:SimulateTouch,
			resistance:'100%',
			scrollContainer: true,
			mousewheelControl: true,
			onTouchMove:function(){
				card.open=false;
			},
			onTouchEnd:function(){
				setTimeout(function(){card.open=true;},500);
			},			
			scrollbar: {
				container:$(this).find('.swiper-scrollbar')[0]
			}
		});
	});

	$('.js-view').on('click',function(){
		if($(this).data('text')==1)
			$(this).html('Ver sugerencias').data('text',2);
		else{
			$(this).html('Agregar a favoritos').data('text',1);
		}

		resetPage(2);

	});
	$('.chatPages ul li').on('click',function(){
		var index=$('.chatPages ul li').index(this);

		pages.swipeTo(index);

	});

	$('.footer .addIcons').on('click',function(){
			$('.footer .boxIcons').slideToggle();
	});

	$('.header .back').on('click',to.back);

	$('.box-carta').on('click',function(){
		if(!card.open)
			return;

		pages.swipeTo(1);
		$('.cardExpanded.chat').show().css('bottom',0);
		$('.swiper-pages').css('bottom',0);

		$('.header .back').off('click',to.back);
		$('.header .back').one('click',function(e){
			e.preventDefault();
			$('.cardExpanded.chat').hide();
			$('.swiper-pages').css('bottom','');
			$('.cardExpanded.chat').css('bottom','');
			$('.footer .Card').hide();
			pages.swipeTo(0);
			resetPage(0);
			$('.header .back').on('click',to.back);

			

		});

	});

	$('.cards .card .image').on('click',function(){
		if(!card.open)
			return;

		$('.cardExpanded.chat').show();
		$('.swiper-pages').css('bottom',50);
		$('.footer .Card').show();
		$('.footer > div:not(.Card)').hide();
		$('.header .back').off('click',to.back);
		$('.header .back').one('click',function(e){
			e.preventDefault();
			$('.cardExpanded.chat').hide();
			$('.swiper-pages').css('bottom','');
			$('.footer .Card').hide();
			$('.header .back').on('click',to.back);			

		});

	});
}









//Extras

var page={
	card:function(){

			$('.swiper-pages').css('top','45px').css('bottom',50);
			$('.cardExpanded').show();
			$('.footer,.footer .Card .btn').show().on('click',function(){
				location.href="agregar.html";
			});
			card.universal();
			$('img').on('load',function(){
				resetPage(0);
			});

	},
	invite:function(){
		card.universal();
		$('.footer,.footer .Card .btn').show();
		card.invite();
		$('.swiper-pages').css('bottom',50);
		resetPage(0);
		
	}
}


var to={
	invite:function(){
		location.href="invite.html"
	},
	add:function(){
		location.href="agregar.html"
	},
	back:function(){
		history.back(1);
	}
}