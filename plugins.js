var isAll; // temporary solution to ccdition show_first function. Should improve the plugin.
var $lastImage;

(function($) {
	//function to catch the name of the html file
	$.FileName=function() {
	link=location.href.split('/');
	address=link[link.length-1];
	return address;
	};
	//function to catch the ellements position and width and set them relative to the document
	
	$.imageNumbers = function($images){
		numImg = $images.filter(':visible').attr('src').split('/');
		imgLenght = numImg.length - 1;
		$('.numbers').text((parseInt(numImg[imgLenght]) + "/" + $images.length));
	};
	
})(jQuery);


//*****************************Start of click photo function**********************
(function($) {
	$.fn.cyclist = function(opts){
//stopClick, previous, next
		var options = $.extend({},$.fn.cyclist.defaults, opts);
		var $container = $(this);
		$.fn.cyclist.stopClick = options.stopClick;
		
		
		
		return this.each(function(){
if ($.FileName != 'about.html') {
			var $images = $(this).children('img');
			$lastImage = $images.first();
			
			
			//$(window).resize(function(){
			//$images.css({'position': 'static', 'width': '100%'}); // default css for the image
			//offset_top = $images.offset().top;
			//offset_left = $images.offset().left;
			//$images.offset({left: offset_left, top: offset_top});
			
			//});
			//$(window).resize();
			
			if (options.stopClick == false) {
				
				show_first=function() { if/* in case all smaller images is activated*/ (!isAll) {$images.hide().first().show();}};
				show_last=function() { $images.hide().last().show(); };
			
				show_first();
				
				$('section').append("<div class='controls'></div>");
				$('.controls').append("<div class='numbers'></div>");
				$('.controls').append("<div class='all_button'></div>");

				$.imageNumbers($images);
				
				
				
				
				$(options.next).add($images).click(function(){ 
	
				if ($.fn.cyclist.stopClick == false) {
					img = $images.filter(':visible').last();
					var last_image = $images.last();
					if (img.is(last_image)){
							show_first();
							$.imageNumbers($images);
							$lastImage = $images.first();	
						
					} else {
						$images.stop();
						$images.fadeOut(options.timeOut);
						img.next().fadeIn(options.timeOut, function() { $.imageNumbers.call(this, $images); $lastImage = $(this);});

					}
				}
				});
				
				$(options.previous).click(function(){ 
					
					img = $images.filter(':visible').first();
					var first_image = $images.first();

					if (img.is(first_image)){
							show_last();
							$.imageNumbers($images);
							$lastImage = $images.last();	
						
					} else {
						$images.stop();
						$images.fadeOut(options.timeOut);
						img.prev().fadeIn(options.timeOut, function() { $.imageNumbers.call(this, $images); $lastImage = $(this);});
						
					}
					
				});
			} else { $images.add(options.previous).add(options.next).unbind('click');};
			
			if (options.cycle == true) {
				options.timeOut = options.cycleTimeOut;
				setInterval(function() { $images.filter(':visible').click(); }, options.speed);
				
			}
}
			});
			
			
		$.fn.cyclist.defaults.timeOut = 1000;

	} ;
	$.fn.cyclist.defaults = {
		previous: "",
		next: "",
		stopClick: false,
		speed: 4000,
		timeOut: 200,
		cycleTimeOut: 2000,
		cycle: false,
		fluid: true
		
	}
})(jQuery);
// *******************************end of click photo function**************************************