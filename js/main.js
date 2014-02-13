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

$(document).on('ready',slide);

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
