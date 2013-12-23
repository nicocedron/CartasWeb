$(document).on('ready',function(){
	IncrementBlocks();
	Block();
	$('img').on('load',Block);
});


function Block(){
	
	$('#content').BlocksIt({
		numOfCol: Math.round($('#content').width()/294),
		offsetX: 8,
		offsetY: 8
	});

		$(window).on('resize',function() {
				$('#content').BlocksIt({
					numOfCol: Math.round($('#content').width()/320),
					offsetX: 8,
					offsetY: 8
				});
		});
}

//Simulate Blocks
function IncrementBlocks(){
	var content=$('#content').html();
	$('#content').append(content);
	$('#content').append(content);
	$('#content').append(content);
}