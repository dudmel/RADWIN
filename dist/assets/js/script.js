(function($){

	/*----- Background -----*/

	// $(".bg-placeholder").each(function(){
	// 	var bagImg = $(this).data('img');
	// 	$(this).css('background-image','url('+bagImg+')');
	// });
	
	resizeBox();
	$(window).resize(function(){
		resizeBox();
	});

	$(window).on('load', function() {
		$(".loader").fadeOut();
	});
	
	/*----- Background -----*/

	function resizeBox(){
		$(".fullHeight").each(function(){
			var height = $(window).height();
			$(this).css('min-height',height);
		});	
	}
	

})(jQuery);