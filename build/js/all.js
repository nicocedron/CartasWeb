$(document).on('ready',function(){
	
	pages = $('.swiper-pages').swiper({
		resistance:'100%',
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
	$('.scroll-container').each(function(){
		$(this).swiper({
			mode:'vertical',
			scrollContainer: true,
			mousewheelControl: true,
			scrollbar: {
				container:$(this).find('.swiper-scrollbar')[0]
			}
		})
	});

	$('ul.nav li').on('click',function(){
		var index=$('ul.nav li').index(this);

		pages.swipeTo(index);


	});

	$('.filter span').on('click',function(){
		$('.filter ul').stop().slideToggle('slow');
	});

});