$(document).on('ready',function(){
	
	pages = $('.swiper-pages').swiper({
		resistance:'100%',
		onSlideChangeStart:function(slide){
			var active=slide.activeIndex;
			$('ul.nav li').removeClass('active').eq(active).addClass('active');

			$('.subheader > div').stop().fadeOut('slow',function(){
				$(this).removeClass('active');
				$('.subheader > div').hide(0).stop().eq(active).fadeIn();
			});

		},
		onTouchMove:function(a){
			console.log(pages.positions);
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

});