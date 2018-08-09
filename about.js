

$(document).ready(function(){
	
	$('nav img').hide();
	
	
	
	$('a[href = "about.html"]').css({"font-weight" : "bold"});
	
	
	
		

	

		$('nav').prepend("<div class='menu'></div>");
		$('.menu').click(function(){
			$('nav > ul').toggle();
		return false;
		});
		$('.menu').hide();
		var menuAdded = false;
		
		$('nav > ul > li').click(
			function liHandler(){
				if(media == 'mobile'){
					if(!$(this).data("visible")) {
						$(this).children('ul').show();
						$(this).data("visible", true);
					} else {
						$(this).children('ul').hide();
						$(this).data("visible", false);	
					}
				};
			}
		);
		

		

		
			
			
				
	
			
// begining of responsive logic stuff ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////responsive logic beginning
			
		function responsiveLogic() { 
			
			function mobile() { //detect a css media 	query change by compering nav and saction, subtract 20 to make sure///////////////////////mobile
				$('nav > ul > li').css('cursor','pointer');

				$('nav li ul').hide();
				$('nav ul').hide();
				$('nav').css({'position':'fixed', 'top': '0px', 'left':'0px'});
				$image.width('100%'); 
				if (menuAdded == false) { $('.menu').show(); menuAdded = true; }
				$('.wrapper').css({'padding-top': '80px'});
				
				
			} 
			
			function full() { // clean up the change for bigger size /////////////////////////////////////////////////////////////////////////////full
				$('.menu').hide();
				$('nav > ul').show();
				$('nav > ul > li').css('cursor','default');
				$('nav li ul').show();
				$('nav').css({'position':'static'});
				$('.wrapper').css({'padding-top': '0px'});
				$('nav > ul').show();

				
				//setInterval(arrow_position, 200);
			
				
			}// end of change display for desktop	//////////////////////////////////////////////////////////end of fulll
			
			
			//begining of media query event ???????????????????????????????????media query?????????????????????????????????????????
			var nav_width = $('nav').width();
			var sec_width = $('section').width();
			var win_width = $(window).width();
			
			if ((nav_width > sec_width - 1)) { 
			
				mobile(); // run mobile function declared below >>>>>>>>>>>>>>>>>>>>
				
				media = 'mobile';
				console.log(media);
				
			} 
			
			if ((nav_width < sec_width - 1)) {
				
				full(); //run desktop function declared below >>>>>>>>>>>>>>>>>>>>>>
				
				media = 'full';
				console.log(media);
				
				
			};

			//end of media query event????????????????????????????????????????????media query???????????????????????????
			
			
			
		} //end of responsive logic stuff////////////////////////////////////////////////////////////////////////////////////////////////////////////responsive logic end
		
		
		
		
		
		
		
		
		
		//resize event throtling//////////////////////////////////////////////////////////////////////////////
		var timer = 0;
		$(window).resize(function(){
			
			if (timer == 0) {
			timer = setTimeout(function() {
				console.log(timer);
			responsiveLogic();
			timer = 0;
			}, 200);
			
			
			
			}
		});
		$(window).resize();
		//end of throtled resize//////////////////////////////////////////////////////////////////////////////
		
		var arrow_int;
		var arrow_tim;
		

		
		function arrowPosition() {
			var height = $('section > img').height();
			var arrowHeight = $('.previous > img').height();
			var position = (height / 2) - (arrowHeight / 2); 
			$('.previous, .next').height(height).children('img').css('margin-top', position);
		}


});


