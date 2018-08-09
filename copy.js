if (!isAll) { 
					$image.hide();
					$lastImage.show() 
					 // begining of image stabilizing for fades
										
					img = $image.filter(':visible');
					var first_image = $image.first();
										
					imgTop = img.position().top;
					imgLeft = img.position().left;
					imgWidth = img.width();
										
					var next = $('.next');
										
					nextTop = next.position().top;
					nextLeft = next.position().left;
					nextWidth = next.width();
										
					var prev = $('.previous');
										
					prevTop = prev.position().top;
					prevLeft = prev.position().left;
					prevWidth = prev.width();				
					$image.css({position: 'static',width: '80%'});
					next.css({position: 'static',width: '5%'});
					prev.css({position: 'static',width: '5%'});
					next.css({position: 'absolute', top: nextTop, left: nextLeft, width: nextWidth});
					prev.css({position: 'absolute', top: prevTop, left: prevLeft, width: prevWidth});
					$image.css({position: 'absolute', top: imgTop, left: imgLeft, width: imgWidth});
					
					 //the end of image stabilising for fades
				
				
				};// JavaScript Document