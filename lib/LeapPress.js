var options = {
	enableGestures: true,
	frameEventName: "animationFrame"
};
	
var swiped = false;
	
var screen = [window.innerWidth, window.innerHeight];
 		 
console.log("LeapPress Ready");

Leap.loop(options, function(frame) {
    var nHands = frame.hands.length;
	
    if(nHands > 0){
		var hand = frame.hands[0];
		var pixels = 5;
		if(hand.pitch() >= 0.4){
			/* Scroll Abajo */							
			window.scrollBy(0,pixels);
		} else if(hand.pitch() <= -0.4){
			/* Scroll Arriba */
			window.scrollBy(0,-pixels);
		}
	}
	
	/*Gestos*/
	frame.gestures.forEach(function(gesture) {	
		if(!swiped){
			switch (gesture.type) {
				case "swipe":
					var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
					var screen = window.screen[1]
									 
					if(isHorizontal){
						if(gesture.direction[0] > 0 && navigation.next != null){
							/* Post Siguiente */
							console.log("Next");							
							window.location.href = navigation.next;
						} else if (navigation.prev != null){
							/* Post Anterior */
							console.log("Previous");
							window.location.href = navigation.prev;		
						}
					} else if(gesture.direction[1] > 0){
						/* Scroll Abajo */							
						window.scrollBy(0,screen);
					} else if(gesture.direction[1] < 0){
						/* Scroll Arriba */
						window.scrollBy(0,-screen);
					}
					swiped = true;
					break;
					
				case "circle":
					if( gesture.normal[2]  < 0 ){
						/* Adelante Navegador */
						console.log("forward");
						history.forward();
					}else{
						/* Atrás Navegador */
						console.log("back");
						history.back();						
					}
					swiped = true;
					break;
			}
		}
		setTimeout(function(){swiped=false;}, 1000);
	});	
});
