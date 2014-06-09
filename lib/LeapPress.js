var options = {
	enableGestures: true,
	frameEventName: "animationFrame"
};
	
var swiped = false;
	
var screen = [window.innerWidth, window.innerHeight];
	
function navigation(){
	if(gesture.direction[0] > 0 && navigation.next != null){
		/* Post Siguiente */
		console.log("Next");							
		window.location.href = navigation.next;
	} else if (navigation.prev != null){
		/* Post Anterior */
		console.log("Previous");
		window.location.href = navigation.prev;		
	}
}
	
function scroll(pixels,type){
	switch (type){
		case: "page"
			if(gesture.direction[1] > 0){
				/* Scroll Abajo */							
				window.scrollBy(0,pixels);
			} else if(gesture.direction[1] < 0){
				/* Scroll Arriba */
				window.scrollBy(0,-pixels);
			}
			break;
		case "line"
			if(hand.pitch() >= 0.4){
				/* Scroll Abajo */							
				window.scrollBy(0,pixels);
			} else if(hand.pitch() <= -0.4){
				/* Scroll Arriba */
				window.scrollBy(0,-pixels);
			}
			break;
	}
}
	
function onSwipe(){
	var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
	var screen = window.screen[1]
				 
	if(isHorizontal){
		navigation();
	} else { //vertical
		scroll(screen,'page');
	}
}
	
function onCircle(){
	if (nFingers == 1){
		if( gesture.normal[2]  < 0 ){
			/* Adelante Navegador */
			console.log("forward");
			history.forward();
		}else{
			/* Atrás Navegador */
			console.log("back");
			history.back();						
		}		
	}
}
	
function onTilt(){
	var pixels = 5;
	scroll(pixels,'line');
}
    		 
console.log("LeapPress Ready");

Leap.loop(options, function(frame) {
    var nHands = frame.hands.length;
    var nFingers = frame.fingers.lenght;
	
    if(nHands > 0){
		var hand = frame.hands[0];
		onTilt();
	}
	
	/*Gestos*/
	frame.gestures.forEach(function(gesture) {	
		if(!swiped){
			switch (gesture.type) {
				case "swipe":			
					onSwipe();
					swiped = true;
					break;
					
				case "circle":
					onCircle();
					swiped = true;
					break;
			}
		}
		setTimeout(function(){swiped=false;}, 1000);
	});	
});
