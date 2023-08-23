$(document).ready(function(){
	

	
	//global variables declaration///////////////////////////////////////global variables///////////
	var $image = $('section.gallery > img');
	var next = $('.next'),
		prev = $('.previous'),
		imgHeight;
	var media;
	var timer = 0;
	var screen_width = window.screen.width;
	var file_name;
	var menuAdded = false;
	var file_name = $.FileName();
	var interval;
	
	isAll = false; //temporarily I declare is all in the plugins file untill I find a better solution to stop show_first function in certain situations
	//////////////////////////////////////////////////////////////end of global variables declaration
	if (file_name != 'index.html' && file_name != 'about.html') {
	$('section').prepend('<div class="previous"><img src="images/arrow_left.png" /></div>'); // add the next and previous button
	$('section').append('<div class="next"><img src="images/arrow_right.png" /></div>');
	}
	
	$('a[href = "' + file_name +'"]').css({"font-weight" : "bold"});
	
	
	$(window).resize(function(){
		imgHeight = $image.height();
	});	
		
/*	function arrow_position(){
		if (imgHeight != next.height() || imgHeight != prev.height()) {
			imgHeight = $image.height();
					
			next.height(imgHeight);
			prev.height(imgHeight);
		}	
	}
*/	
	//load smaller photos for mobile browsers/////////////////////////////////////////////////photo loading size///////
	
	if (screen_width > 1500) {
		$('img').each(function(){
			path = $(this).attr('src')
			path = path.replace('images','images');
			$(this).attr('src', path);
			console.log(path);
		});
	} else if (screen_width < 650) {
		$('img').each(function(){
			path = $(this).attr('src')
			path = path.replace('images','images');
			$(this).attr('src', path);
			console.log(path);
		});
	}
		
	//end od load smaller photos for mobile browsers////////////////////////////////////////end of photo loading size////
	
	
	



//cycle images on home page using cycle plugin
	

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
		

		
		
// display all the photos for smaller devices and replace menu with a button
		if (file_name == 'index.html') {
		$.fn.cyclist.defaults.timeOut = 1000;
		}
		if (file_name != 'about.html') {
			$('section').cyclist({previous: '.previous', next: '.next'}); //cyclist on section
		}
		
			
		$('.all_button').toggle(///////////////////////////////////////////////////////////////all or single photo choice//////////////
			
			function(){//  first togglee///////////////////////////////
				isAll = true; // info for .css() under resize
				$lastImage = $image.filter(':visible');
				$image.show().css({position: "static", width: "24%", height: 'auto', margin: "30px", float: "left"});
				
				$(window).resize(function(){
					if(isAll){
						$image.css('height','auto');
						var height = $image.height();
						$image.css({height: height});
					}
				}).resize();
				
				$('.next, .previous').hide();
				$('.numbers').hide();
				$(this).css({"background-image": "url(images/all_button2.png)"});
				
				$image.on('click.all_img',function(){
					$lastImage = $(this);
					$('.all_button').trigger('click');
					$image.unbind('click.all_img');
					$.imageNumbers($image);
				});
						
						
			}, function(){ //////////second toggle///////////////
				
				isAll = false; // info for .css() under resize
				$image.css({width: "80%", height: "auto", margin: "0px", float: "left"}).hide();
				console.log($lastImage.attr('src'));
				$lastImage.show();
				$('.next, .previous').show();
				$('.numbers').show();
				$(this).css({backgroundImage: "url(images/all_button.png)"});
				$(window).resize();
			}
		);///////////////////////////////////////////////////////////////////////////////////////////end of all or single photo change////////////////////
				
				
		 if (file_name == 'index.html') {
			$('.controls').hide();
			$image.css('margin-left','5%');
			$.fn.cyclist.defaults.timeOut = 1000;
			interval = setInterval(function() { $image.filter(':visible').click(); }, 2000);
		 }		
			
// begining of responsive logic stuff ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////responsive logic beginning
			
		function responsiveLogic() { 
			
			if (!isAll) { $image.css({'position': 'static', 'width': '80%'}); } // default css for the image -- the width perecentage should be same as css file
			$('.next, .previous').css({'position': 'static', 'width': '5%'});
			
			function mobile() { //detect a css media 	query change by compering nav and saction, subtract 20 to make sure///////////////////////mobile
				$('nav > ul > li').css('cursor','pointer');
				
				
					//toggle second level li

				
				
				$image.css({position: "static", width: "100%", height: 'auto', margin: "0px", float: "left"}); // clean up after displaying all images
				
				$.fn.cyclist.stopClick = true;
	
				$('nav li ul').hide();
				$image.show(); 
				$('.controls').hide()
				$('nav ul').hide();
				$('.next, .previous').hide();
				$('nav').css({'position':'fixed', 'top': '0px', 'left':'0px'});
				$image.width('100%'); 
				if (menuAdded == false) { $('.menu').show(); menuAdded = true; }
				$('.wrapper').css({'padding-top': '80px'});
				
				
			} 
			
			function full() { // clean up the change for bigger size /////////////////////////////////////////////////////////////////////////////full
				$('.menu').hide();
				$('nav > ul > li').css('cursor','default');

				setTimeout(function() { // timeout so that css could catch up with js on media querry change
				menuAdded = false;
				if (file_name != 'index.html' && file_name != 'about.html') {
					$('.controls').show();
				}
				if (!isAll) { 
					//arrowPosition();
					$image.hide();
					$lastImage.show(); 
					 // begining of image stabilizing for fades/////////////////////////////
										
					var img = $image.filter(':visible');
					var first_image = $image.first();
										
					var imgTop = img.position().top;
					var imgLeft = img.position().left;
					var imgWidth = img.width();
					
					if (file_name != 'index.html' && file_name != 'about.html') {					
					var next = $('.next');
										
					var nextTop = next.position().top;
					var nextLeft = next.position().left;
					var nextWidth = next.width();
										
					var prev = $('.previous');
										
					var prevTop = prev.position().top;
					var prevLeft = prev.position().left;
					var prevWidth = prev.width();
					}
								
					$image.css({position: 'static',width: '80%'});
					if (file_name != 'index.html' && file_name != 'about.html') {
					next.css({position: 'static',width: '5%'});
					prev.css({position: 'static',width: '5%'});
					next.css({position: 'absolute', top: nextTop, left: nextLeft, width: nextWidth});
					prev.css({position: 'absolute', top: prevTop, left: prevLeft, width: prevWidth});
					}
					$image.css({position: 'absolute', top: imgTop, left: imgLeft, width: imgWidth});
					
					
					
					 //the end of image stabilising for fades//////////////////////////////////////////////
				
				} else {
					$image.show().css({position: "static", width: "24%", height: 'auto', margin: "30px", float: "left"}); // bring bag display all css after media	
					var height = $image.height();
					$image.css({height: height});
				};
				
				}, 200); // timer so that css could catch up with java script
				$('nav li ul').show();
			
				
				
				$.fn.cyclist.stopClick = false;
				
				$('nav').css({'position':'static'});
				$('.wrapper').css({'padding-top': '0px'});
				$('nav > ul').show();
				if (!isAll) {$('.next, .previous').show()};
				
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


