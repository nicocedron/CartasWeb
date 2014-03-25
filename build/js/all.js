var SimulateTouch=true;





var card={
	open:true,
	show:function(){

		if(!card.open)
			return;

		$('.subheader,#comparteList').hide();
		$('.swiper-pages').css('top','45px');
		$('.cardExpanded').show();

		$('.header .left .logo').hide();
		$('.header .left .back').show()
			.one('click',back)
			.one('click',function(){

				$('.subheader,#comparteList').show();
				$('.swiper-pages').css('top','');
				$('.cardExpanded').hide();
				resetPage(0);
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

	$('.header .right .icon').on('click',function(){
		$('.header .right .menu').toggle();
		$(this).toggleClass('active');
	});

}