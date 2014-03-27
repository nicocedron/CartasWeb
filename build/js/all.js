var SimulateTouch=true;





var card={
	open:true,
	show:function(){

		if(!card.open)
			return;
		$('.footer .Card .js-invite').off('click',card.invite);

		$('.subheader,#comparteList').hide();
		$('.swiper-pages').css('top','45px').css('bottom',50);
		$('.cardExpanded').show();
		$('.footer,.footer .Card .btn').show();

		$('.header .left .logo').hide();
		$('.header .left .back').show()
			.one('click',back)
			.one('click',function(){

				$('.subheader,#comparteList').show();
				$('.swiper-pages').css('top','').css('bottom','');
				$('.cardExpanded,.cardInvite,.footer,.footer .btn').hide();
				$('.subheader').css('height','');
				$('.subheader > div').css('display','none').eq(0).stop().fadeIn('slow');
				resetPage(0);
			});

		resetPage(0);

		$('.footer .Card .js-invite').on('click',card.invite);


	},

	invite:function(){

		$('.cardExpanded').hide();
		$('.cardInvite,.subheader').show();
		$('.subheader').css('height',110);
		$('.swiper-pages').css('top','155px');

		$('.footer .Card .btn').hide();
		$('.footer .Invite .js-invite').show();

		$('.subheader .Invite .js-edit').on('click',function(){
			if($(this).hasClass('gray'))
				return; 

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


		$('.subheader > div').css('display','none').eq(3).stop().fadeIn('slow');

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

			$('.subheader > div:visible').stop().fadeOut('fast',function(){
				$(this).removeClass('active');
				$('.subheader > div').css('display','none').eq(active).stop().fadeIn('slow');
			});

		}

	});

	//Scroll Containers
	PAGE=[];
	$('.scroll-container').each(function(i){
		
		PAGE[i]= $(this).swiper({
			mode:'vertical',
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

	$('.filter span').on('click',function(){
		$('.filter ul').stop().slideToggle('slow');
	});


	$('div.search.icon-filter').on('click',function(){
		$('#comparteList').toggle();
		$('.filterPage').toggle();
		
		resetPage(0);
	});

	$('#comparteList .card .image').on('click',card.show);



}
$(document).on('ready',function(){
	$('.header .right .icon').on('click',function(){
		$('.header .right .menu').toggle();
		$(this).toggleClass('active');
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

	$('.chatPages ul li').on('click',function(){
		var index=$('.chatPages ul li').index(this);

		pages.swipeTo(index);

	});

	$('.footer .addIcons').on('click',function(){
			$('.footer .boxIcons').slideToggle();
	});

	$('.header .back').on('click',function(){
		location.href="index.html"
	});

	$('.cards .card .image').on('click',function(){
		if(!card.open)
			return;

		$('.cardExpanded.chat').show();
		$('.swiper-pages').css('bottom',50);
		$('.footer .Card').show();
	});
}